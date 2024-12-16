'use client';

import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Select,
  SelectItem,
  Divider,
  Input,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { useAuth } from '../authentication/AuthContext';
import pb from '../authentication/PocketBaseClient';
import * as icons from '../assets/SvgIcons';
import styles from './CreateQuizModal.module.css';
import { MdiPlus } from '../assets/SvgIcons';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { toasterror, toastsuccess, toastwarn } from '../toasthelper';
import './MyQuizzesModal.css';

interface Quiz {
  id: string;
  quiz_code: string;
  quiz_description: string;
  number_of_questions: number;
  category: string;
  difficulty: string;
  questions: string;
  answers: string;
  correct_answers: string;
  creator: string;
  created: string;
  updated: string;
}

interface MyQuizzesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyQuizzesModal: React.FC<MyQuizzesModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [quizDescription, setQuizDescription] = useState('');
  const [category, setCategory] = useState<{ label: string; icon: JSX.Element }>();
  const [difficulty, setDifficulty] = useState<{ label: string; icon: JSX.Element }>();
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [hasModified, setHasModified] = useState<boolean>(false);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [verifiedQuizIds, setVerifiedQuizIds] = useState<string[]>([]);


  const categories = [
    { label: 'matematika', icon: <icons.MynauiMathSolid /> },
    { label: 'tudomány', icon: <icons.MdiFlask /> },
    { label: 'művészet', icon: <icons.MdiArt /> },
    { label: 'sport', icon: <icons.FluentSport16Regular /> },
    { label: 'technológia', icon: <icons.GridiconsPhone /> },
    { label: 'utazás', icon: <icons.FaPlane /> },
    { label: 'videók', icon: <icons.RiMovieLine /> },
    { label: 'film', icon: <icons.BxCameraMovie /> },
    { label: 'zene', icon: <icons.MdiMusic /> },
    { label: 'könyvek', icon: <icons.MaterialSymbolsBookOutline /> },
    { label: 'játékok', icon: <icons.IonGameControllerOutline /> },
    { label: 'egyéb', icon: <icons.BasilOther1Outline /> },
  ];

  const difficulties = [
    { label: 'Könnyű', icon: <icons.MynauiSquareSolid /> },
    { label: 'Közepes', icon: <icons.MynauiSquareSolid2 /> },
    { label: 'Nehéz', icon: <icons.MynauiSquareSolid3 /> },
  ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const quizzesResponse = user.role
          ? await pb.collection('quizzes').getFullList<Quiz>({ sort: '-created', expand: 'creator' })
          : await pb.collection('quizzes').getFullList<Quiz>({
            filter: `creator="${user.id}"`,
            sort: '-created',
          });
        setQuizzes(quizzesResponse);
        const verifiedResponse = await pb.collection('verifiedQuizzes').getFullList();
        setVerifiedQuizIds(verifiedResponse.map((v: any) => v.quiz_id));
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchQuizzes();
    }
  }, [isOpen, user]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredQuizzes(quizzes);
    } else if ("x".includes(searchTerm.toLowerCase())) {
      // Szűrés nem hitelesített kvízekre
      setFilteredQuizzes(quizzes.filter((quiz) => !verifiedQuizIds.includes(quiz.id)));
    }
    else if ("j".includes(searchTerm.toLowerCase())) {
      // Szűrés hitelesített kvízekre
      setFilteredQuizzes(quizzes.filter((quiz) => verifiedQuizIds.includes(quiz.id)));
    } 
    else {
      const searchLower = searchTerm.toLowerCase();
      setFilteredQuizzes(
        quizzes.filter((quiz: any) =>
          quiz.quiz_code.toLowerCase().includes(searchLower) ||
          quiz.category.toLowerCase().includes(searchLower) ||
          quiz.difficulty.toLowerCase().includes(searchLower) ||
          (quiz.expand?.creator?.username || '').toLowerCase().includes(searchLower)
        )
      );
    }
  }, [searchTerm, quizzes, verifiedQuizIds]);

  const WarningOptions= {
    //position: "top-center", 
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    toastId: "myquizzesmodal_warning_toast",
    transition: Bounce,

  }
  const SuccesOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    toastId: "myquizzesmodal_success_toast",
    transition: Bounce,
  }
  const ErrorOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "myquizzesmodal_error_toast",
    theme: "colored",
    transition: Bounce,
  }

  const handleVerifyQuiz = async (quizId: string) => {
    if (verifiedQuizIds.includes(quizId)) return;
    try {
      await pb.collection('verifiedQuizzes').create({ quiz_id: quizId });
      setHasModified(true);
      setVerifiedQuizIds((prev) => [...prev, quizId]);
    } catch (error) {
      console.error('Verify error:', error);
      //alert('Hiba történt a kvíz hitelesítésekor.');
      toasterror("Hiba történt a kvíz hitelesítésekor.",ErrorOptions)
    }
  };

  const handleUnverifyQuiz = async (quizId: string) => {
    if (!verifiedQuizIds.includes(quizId)) return;
    try {
      const record = await pb.collection('verifiedQuizzes').getFirstListItem(`quiz_id="${quizId}"`);
      await pb.collection('verifiedQuizzes').delete(record.id);
      setHasModified(true);
      setVerifiedQuizIds((prev) => prev.filter((id) => id !== quizId));
    } catch (error) {
      console.error('Unverify error:', error);
      //alert('Hiba történt a kvíz hitelesítésének visszavonásakor.');
      toasterror("Hiba történt a kvíz hitelesítésének visszavonásakor.",ErrorOptions)
    }
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setQuizDescription(quiz.quiz_description);
    const matchedCategory = categories.find((cat) => cat.label === quiz.category);
    const matchedDifficulty = difficulties.find((diff) => diff.label === quiz.difficulty);
    setCategory(matchedCategory);
    setDifficulty(matchedDifficulty);
    setQuestions(JSON.parse(quiz.questions));
    setAnswers(JSON.parse(quiz.answers).map((ansArray: string[]) => ansArray.join('; ')));
    setCorrectAnswers(JSON.parse(quiz.correct_answers));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if ("státusz".includes(term.toLowerCase())) {
      setFilteredQuizzes(quizzes.filter((quiz) => !verifiedQuizIds.includes(quiz.id)));
    } else {
      const searchLower = term.toLowerCase();
      setFilteredQuizzes(
        quizzes.filter((quiz: any) =>
          quiz.quiz_code.toLowerCase().includes(searchLower) ||
          quiz.category.toLowerCase().includes(searchLower) ||
          quiz.difficulty.toLowerCase().includes(searchLower) ||
          (quiz.expand?.creator?.username || '').toLowerCase().includes(searchLower)
        )
      );
    }
  };

  const handleEditSubmit = async () => {
    if (!editingQuiz || !category || !difficulty) {
      //alert('Kérjük, töltsd ki az összes mezőt!');
      toastwarn("Kérjük, töltsd ki az összes kötelező mezőt.",WarningOptions)

      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const answerArray = answers[i].split(';').map(ans => ans.trim());
      let numberOfQuestions = i+1;
      if (answerArray.length < 1 || answerArray.length > 4) {
        //alert(`A(z) ${i + 1}. kérdéshez 1 és 4 közötti válaszlehetőséget kell megadnod.`);
        toastwarn( "A(z) "  + numberOfQuestions +". kérdéshez 1 és 4 közötti válaszlehetőséget kell megadnod.",WarningOptions)
        return;
      }
      if (!answerArray.includes(correctAnswers[i].trim())) {
        //alert(`A(z) ${i + 1}. kérdéshez megadott helyes válasz nem szerepel a válaszok között.`);
        toastwarn( "A(z) "  + numberOfQuestions +". kérdéshez megadott helyes válasz nem szerepel a válaszok között.",WarningOptions)
        return;
      }
      const correctAnswersCount = answerArray.filter(ans => ans === correctAnswers[i].trim()).length;
      if (correctAnswersCount !== 1) {
        //alert(`A(z) ${i + 1}. kérdéshez pontosan egy helyes választ kell megadni.`);
        toastwarn( "A(z) "  + numberOfQuestions +". kérdéshez pontosan egy helyes választ kell megadni.",WarningOptions)
        return;
      }
    }

    const updatedQuiz = {
      ...editingQuiz,
      quiz_description: quizDescription,
      number_of_questions: questions.length,
      category: category.label,
      difficulty: difficulty.label,
      questions: JSON.stringify(questions),
      answers: JSON.stringify(answers.map((ans) => ans.split(';').map((a) => a.trim()))),
      correct_answers: JSON.stringify(correctAnswers.map(q => q.trim())),
    };

    try {
      await pb.collection('quizzes').update(editingQuiz.id, updatedQuiz);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) => (quiz.id === editingQuiz.id ? updatedQuiz : quiz))
      );
      handleUnverifyQuiz(editingQuiz.id);
      setHasModified(true);
      setEditingQuiz(null);
      //alert('Kvíz sikeresen frissítve! Adminisztrátor jóváhagyásra vár.');
      toastsuccess("Kvíz sikeresen frissítve! Adminisztrátor jóváhagyásra vár.",SuccesOptions)
    } catch (error) {
      console.error('Update quiz error:', error);
      //alert('Hiba történt a kvíz frissítésekor.');
      toasterror("Hiba történt a kvíz frissítésekor.",ErrorOptions)

    }
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
    setAnswers([...answers, '']);
    setCorrectAnswers([...correctAnswers, '']);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    const newAnswers = [...answers];
    const newCorrectAnswers = [...correctAnswers];

    newQuestions.splice(index, 1);
    newAnswers.splice(index, 1);
    newCorrectAnswers.splice(index, 1);

    setQuestions(newQuestions);
    setAnswers(newAnswers);
    setCorrectAnswers(newCorrectAnswers);
  };

  const renderCreator = (quiz: any) => {
    if (user?.role)
      return (
        <div>
          <strong>Létrehozó:</strong> {quiz.expand?.creator?.username || 'Ismeretlen'}
        </div>
      );
  };

  const handleDelete = async (quizId: string) => {
    try {
      await pb.collection('quizzes').delete(quizId);
      setHasModified(true);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      //alert('Kvíz sikeresen törölve!');
      toastsuccess("Kvíz sikeresen törölve!",SuccesOptions)
    } catch (error) {
      console.error('Delete quiz error:', error);
      //alert('Hiba történt a kvíz törlésekor.');
      toasterror("Hiba történt a kvíz törlésekor.",ErrorOptions)
    }
  };

  const handleModalClose = () => {
    if (hasModified) {
      window.location.reload();
    }
    onClose();
  };

  const CopyButton = ({ quizCode }: any) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(quizCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <strong>Kvíz megosztó kód:</strong>
        <span>{quizCode}</span>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? '#28a745' : '#ff8e2b',
            color: '#fff',
            border: 'none',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            width: '4rem',
            height: '2rem',
            fontSize: '0.75rem',
          }}
          aria-label="Copy to clipboard"
        >
          {copied ? 'Másolva!' : 'Másolás'}
        </button>
      </div>
    );
  };

  const renderVerification = (quiz: Quiz) => {
    const isVerified = verifiedQuizIds.includes(quiz.id);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        {user?.role && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            <strong>Jóváhagyás:</strong>
            <Tooltip content="Jóváhagyás" key={"success"} color={"success"}>
              <Button
                size="sm"
                disabled={isVerified}
                onPress={() => handleVerifyQuiz(quiz.id)}
                style={{ background: 'transparent' }}
              >
                <icons.Accept />
              </Button>
            </Tooltip>
            <Tooltip content="Megtagadás" key={"danger"} color={"danger"}>
              <Button
                size="sm"
                onPress={() => handleUnverifyQuiz(quiz.id)}
                disabled={!isVerified}
                style={{ background: 'transparent' }}
              >
                <icons.Deny />
              </Button>
            </Tooltip>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <strong>Státusz:</strong>
          {isVerified ? <Tooltip content="Hitelesített" color={"success"}><Button style={{ background: 'transparent', padding: 0, display: 'inline', minWidth: 0 }} disabled={true}><icons.Accept /></Button></Tooltip> 
          : <Tooltip content="Nem elfogadott/Jóváhagyásra vár" key={"danger"} color={"danger"}><Button style={{ background: 'transparent', padding: 0, display: 'inline', minWidth: 0 }} disabled={true}><icons.Deny /></Button></Tooltip>}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="modal-wrapper">
        {editingQuiz && (
          <Modal isOpen={!!editingQuiz} onClose={() => setEditingQuiz(null)} closeButton backdrop="blur" className={styles.modalWindow}>
            <ModalContent className={styles.modalContent}>
              <ModalHeader>Kvíz szerkesztése</ModalHeader>
              <ModalBody className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Kvíz leírása (min. 10, max. 400 karakter):</label>
                  <Textarea
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Kategória:</label>
                  <Select
                    isRequired
                    defaultSelectedKeys={[category?.label || '']}
                    placeholder="Válassz kategóriát"
                    onChange={(e) => {
                      const selectedCategory = categories.find((cat) => cat.label === e.target.value);
                      setCategory(selectedCategory);
                    }}
                    className={styles.select}
                    aria-label="Kategória kiválasztása"
                    renderValue={() =>
                      category && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {category.icon}
                          {category.label}
                        </span>
                      )
                    }
                  >
                    {categories.map((cat) => (
                      <SelectItem key={cat.label} value={cat.label} textValue={cat.label}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {cat.icon}
                          {cat.label}
                        </span>
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className={styles.formGroup}>
                  <label>Nehézség:</label>
                  <Select
                    isRequired
                    placeholder="Válassz nehézséget"
                    defaultSelectedKeys={[difficulty?.label || '']}
                    onChange={(e) => {
                      const selectedDifficulty = difficulties.find((diff) => diff.label === e.target.value);
                      setDifficulty(selectedDifficulty);
                    }}
                    aria-label="Nehézség kiválasztása"
                    renderValue={() =>
                      difficulty && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {difficulty.icon}
                          {difficulty.label}
                        </span>
                      )
                    }
                  >
                    {difficulties.map((diff) => (
                      <SelectItem key={diff.label} value={diff.label} textValue={diff.label}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {diff.icon}
                          {diff.label}
                        </span>
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className={styles.questionsSection}>
                  <h3>Kérdések:</h3>
                  {questions.map((question, index) => (
                    <div key={index} className={styles.questionGroup}>
                      <div>
                        <label>Kérdés {index + 1}:</label>
                        <Input
                          placeholder="Írd be a kérdést..."
                          value={questions[index]}
                          onChange={(e) =>
                            setQuestions((prev) => {
                              const updated = [...prev];
                              updated[index] = e.target.value;
                              return updated;
                            })
                          }
                        />
                      </div>
                      <div>
                        <label>Válaszok (pontosvesszővel elválasztva, maximum 4):</label>
                        <Input
                          placeholder="Válasz1; Válasz2; Válasz3; Válasz4"
                          value={answers[index]}
                          onChange={(e) =>
                            setAnswers((prev) => {
                              const updated = [...prev];
                              updated[index] = e.target.value;
                              return updated;
                            })
                          }
                        />
                      </div>
                      <div>
                        <label>Helyes válasz (maximum 1):</label>
                        <Input
                          placeholder="Írd be a helyes választ..."
                          value={correctAnswers[index]}
                          onChange={(e) =>
                            setCorrectAnswers((prev) => {
                              const updated = [...prev];
                              updated[index] = e.target.value;
                              return updated;
                            })
                          }
                        />
                      </div>
                      {questions.length > 1 && (
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => removeQuestion(index)}
                          className={styles.removeButton}
                        >
                          Törlés
                        </Button>
                      )}
                      <Divider className={styles.questionDivider} />
                    </div>
                  ))}
                  <Button
                    color="primary"
                    onClick={addQuestion}
                    className={styles.addButton}
                    startContent={<MdiPlus />}
                    aria-label="Több kérdés hozzáadása"
                  >
                    Több kérdés hozzáadása
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleEditSubmit}>
                  Mentés
                </Button>
                <Button color="danger" variant="light" onPress={() => setEditingQuiz(null)}>
                  Mégsem
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        <Modal className='mqmodal' isOpen={isOpen} onClose={handleModalClose} closeButton style={{ top: '1.5rem', position: 'absolute' }}>
          <ModalContent>
            <ModalHeader style={{ marginRight: '.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{marginRight: '.4rem'}}>Kvízek</span>
              <div className={styles.inputContainer} style={{flexGrow: 1}}>
                <input
                  key="default"
                  type="text"
                  placeholder="Keresés... (státuszra: J vagy X)"
                  className={styles.customInput}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <icons.RivetIconsMagnifyingGlass style={{margin: '4 4 4 4', width: '1.4rem', paddingBottom: '.5rem'}} className={styles.icon} />
              </div>

            </ModalHeader>
            <ModalBody className='mqmodalbody'>
              {loading ? (
                <div>Betöltés...</div>
              ) : filteredQuizzes.length === 0 ? (
                <div>Nincs találat.</div>
              ) : (
                <ul>
                  {filteredQuizzes.map((quiz) => (
                    <li key={quiz.id}>
                      <CopyButton quizCode={quiz.quiz_code} />
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong>Kategória:</strong> {quiz.category}
                        {quiz.category && categories.map((cat) => (cat.label === quiz.category ? cat.icon : null))}
                      </div>
                      <br />
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong>Nehézség:</strong> {quiz.difficulty}
                        {quiz.difficulty && difficulties.map((diff) => (diff.label === quiz.difficulty ? diff.icon : null))}
                      </div>
                      {renderCreator(quiz)}
                      {renderVerification(quiz)}
                      <Button size="sm" color="primary" onPress={() => handleEditQuiz(quiz)} style={{ marginRight: '1rem' }}>
                        Szerkeszt
                      </Button>
                      <Button size="sm" color="danger" onPress={() => handleDelete(quiz.id)}>
                        Törlés
                      </Button>
                      <Divider className="my-4" style={{ background: 'red', height: '0.2rem' }} />
                    </li>
                  ))}
                </ul>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleModalClose}>
                Bezárás
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* <ToastContainer stacked limit={5}
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              /> */}
      </div>
    </>
  );
};

export default MyQuizzesModal;
