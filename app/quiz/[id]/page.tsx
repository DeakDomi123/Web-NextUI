//Work in progress
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/authentication/AuthContext';
import * as icons from '@/app/assets/SvgIcons';
import pb from '@/app/authentication/PocketBaseClient';
import { categories } from '../categories';
import headerStyles from '@app/header/Header.module.css';
import Header from '@/app/header/Header';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import './quizidpage.css';
import { Button } from '@nextui-org/button';
import { CircularProgress } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import LeaderBoardTable, { getScoresForLeaderBoardTable } from '@/app/leaderboardtable/LeaderBoardTable';
import Confetti from '@/app/confetti/Confetti';


export const dynamic = 'auto', dynamicParams = true, fetchCache = 'auto', runtime = 'nodejs', preferredRegion = 'auto'

const getQuiz = async (filter : string) => {
  try{

    let data = await pb.collection('quizzes').getFirstListItem(
      filter,
      { expand: 'creator', }
    );
    return data as any;
  }
  catch(error: any){
    return null;
  }
};

class TimerData {
  public timerProgressPct : number = 100;
  public color: "success" | "warning" | "danger" = "success";
  public timeMS : number = 0;
}

const formatMSToLabel = (ms : number) => {
  let d = new Date(ms);
  let parts = [
    d.getMinutes(),
    d.getSeconds(),
    // d.getMilliseconds()
  ];
  // Zero-pad
  let formatted = parts.map(s => String(s).padStart(2,'0')).join(':');
  return formatted;
}


export default function QuizPage({ params }: { params: {id: string }} ){
  const { user, loading } = useAuth();
  const router = useRouter();
  const [quizLoading, setQuizLoading] = useState<boolean>(true);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const quizLeaderBoardScores = useRef<any>();
  const quizScoreRecord = useRef<any>();

  const [quiz, setQuiz] = useState<any>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [questionIndex, setQuestionIdex] = useState<number>(0);
  const [timerData, setTimerData] = useState<TimerData>();
  const [shouldStartTimeout, setShouldStartTimeout] = useState<boolean>(true);
  const correctAnswerCount = useRef<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  
  const runningTimeout = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (user) {
      loadPage();
    }
  }, [user]);

  const loadPage = async () => {
    try{
      let id = (params).id;

      let filter = `id~"${id}"`
      let quiz = await getQuiz(filter);
      if(quiz == null){
        filter = `quiz_code~"${id}"`
        quiz = await getQuiz(filter);
      }

      setQuiz(quiz);
    }
    catch (error) {
      console.error('Quiz fetch hiba:', error);
    }
    finally {
      setQuizLoading(false);
    }
  }
  const id = (params).id;

  //ha nincs bejelentkezve és valahogy mégis eléri az oldalt akkor egyszerűen visszatér a program
  //technikailag nem lehetséges mert azonnal visszairányítja a login oldalra
  if (!user) return;

  //ha tölt az oldal vagy a quizek akkor ezt írja ki
  if (loading || quizLoading) return (<><div><h1><p>Betöltés...</p></h1></div></>);

  if (quiz == null || quiz == undefined) return (<><div><h1><p>A kvíz ({id}) nem elérhető vagy nem létezik...</p></h1></div></>);

  const questions = JSON.parse(quiz.questions);
  const answers = JSON.parse(quiz.answers);
  const correct_answers = JSON.parse(quiz.correct_answers);
  const timeLimitMS = 10000;

  const startTimer = (startTimeMS : number, 
    onTimerTick : (currentTime: number) => void,
    onTimerOver : () => void) => {
      let prevTimeMS = Date.now();
      let timerCurrentMS = startTimeMS;
  
      let timerId = setInterval(function() {
        let nowMS = Date.now();
        let diff = nowMS - prevTimeMS;
        prevTimeMS = nowMS;
  
        timerCurrentMS -= diff;
        if(timerCurrentMS < 0) {
          timerCurrentMS = 0;
        }
        
        onTimerTick(timerCurrentMS);
  
        if(timerCurrentMS <= 0) {
          if(runningTimeout.current != null) {
            clearInterval(runningTimeout.current);
            runningTimeout.current = (null);
            onTimerOver();
          }
        }
      }, 10);
      runningTimeout.current = (timerId);
  }

  const submitAnswer = async (answerIndex : number | null) => {
    if(runningTimeout.current != null){
      clearInterval(runningTimeout.current);
      runningTimeout.current = (null);
    }

    let newScore = totalScore;
    if(answerIndex != null) {
      if(correct_answers[questionIndex] == answers[questionIndex][answerIndex]) {
        correctAnswerCount.current += 1;
        let spentTimePct = 0;
        if(timerData != null)
          spentTimePct = (timerData.timeMS / timeLimitMS);
        
        spentTimePct = Math.pow(spentTimePct, 0.5);
        let score = Math.round(spentTimePct * 1000);
        newScore += score;
        setTotalScore(newScore);
      }
      setSelectedAnswer(answerIndex);
    }
    else
      setSelectedAnswer(-1);

    if(questions.length > questionIndex + 1) {
      setShowCorrectAnswer(true);
      setTimeout(() => {
        setShowCorrectAnswer(false);
        setQuestionIdex(questionIndex + 1);
        setShouldStartTimeout(true);
      }, 2000)
    }
    else{
      setShowCorrectAnswer(true);
      setTimeout(async () => {
        setShowCorrectAnswer(false);
        setShouldStartTimeout(false);
        
        endQuiz(newScore);
      }, 2000)
    }
  }

  const endQuiz = async (finalScore: number) => {
    quizScoreRecord.current = await pb.collection('scores').create({
      "quiz_id": quiz?.id,
      "user_id": user.id,
      "score": finalScore,
      "correct_answers": correctAnswerCount.current,
    })
    quizLeaderBoardScores.current = await getScoresForLeaderBoardTable(quiz.id, quizScoreRecord.current.id);
    setQuizFinished(true);
  }

  const onBackButton = () => {
    router.push('/quiz');
  }


  if(runningTimeout.current == null && shouldStartTimeout){
    setShouldStartTimeout(false);

    let iTimerD = new TimerData();
    iTimerD.timeMS = timeLimitMS;
    iTimerD.timerProgressPct = 100;
    setTimerData(iTimerD);

    startTimer(timeLimitMS,
      (currentTime) => {
        let pct = (currentTime / timeLimitMS) * 100;
        let d : TimerData = new TimerData();
        d.timeMS = currentTime;
        d.timerProgressPct = pct;

        if(pct > 66)
          d.color = "success";
        else if(pct > 33)
          d.color = "warning";
        else
          d.color = "danger";

        setTimerData(d);
      },
      () => {
        submitAnswer(null);
        // alert("timer out");
      });
  }
      
  return(
    <>
    <Header quizMainHeaderMode={false} backButton={onBackButton}/>
    {quizFinished &&
    <>
          <Confetti speed={.4}/>
          <div className='outer-content-div'>
            <div className='content-div'>
              <div className='center-col'>
                <Card className='main-card'>
                  <CardHeader className='justify-center'>
                    <p className='text-3xl font-bold text-center'>Gratulálunk!</p>
                  </CardHeader>
                  <CardBody>
                    <div className='card-body'>
                      <div className='flex justify-center items-center flex-col w-full'>
                        <p className='text-xl font-bold text-center'>Helyes válaszok: {correctAnswerCount.current} / {questions.length}</p>
                        <p className='text-xl font-bold text-center'>Pontszám: {totalScore}</p>

                        <div className='mt-8 w-full'>
                          <LeaderBoardTable quizScores={quizLeaderBoardScores.current} />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div></>
    }

    {!quizFinished &&
    <div className='outer-content-div'>
      <div className='content-div'>
        <div className='side-col'>
        </div>
        <div className='center-col'>
          <Card className='main-card'>
            <CardBody>
              <div className='card-body'>
                <p className='text-3xl font-bold text-center'>{questionIndex + 1}. kérdés</p>
                <p className='text-xl font-bold text-center'>{questions[questionIndex]}</p>
                <div className='answers-div'>
                  {answers[questionIndex].map((ans : string, index : number) => {
                    let bg: "default" | "success" | "danger" = "default";
                    if(showCorrectAnswer) {
                      if(correct_answers[questionIndex] == answers[questionIndex][index])
                        bg = 'success';
                      else if(index == selectedAnswer)
                        bg = 'danger';
                    }
                    
                    let click = () => {};
                    if(!showCorrectAnswer)
                      click = () => submitAnswer(index);

                    return (
                      <Button color={bg} className='answer-button' key={index} onClick={click}>
                        <span className='text-xl text-center'>{ans}</span>
                      </Button>
                    );
                })}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='side-col flex flex-col gap-4'>
          <Card className='clock-card'>
            <CardBody>
              <div className='clock-body'>
                <p className='text-xl text-center font-bold'>Kérdésre hátralévő idő</p>
                <div>
                  <CircularProgress
                    aria-label="Loading..."
                    classNames={{
                      svg: "w-24 h-24",
                      label: "text-xl"
                    }}
                    disableAnimation
                    value={timerData?.timerProgressPct ?? 100}
                    strokeWidth={4}
                    color={timerData?.color ?? "success"}
                    showValueLabel={false}
                    label={timerData?.timeMS != null ? formatMSToLabel(timerData.timeMS) : formatMSToLabel(timeLimitMS)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className='clock-card'>
            <CardBody>
              <div className='flex flex-col gap-0.5'>
                <p className='text-xl text-center font-bold'>Pontszám</p>
                <p className='text-xl text-center'>{totalScore}</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
    }
    </>
  )
}
