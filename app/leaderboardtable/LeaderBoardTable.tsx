'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import pb from '../authentication/PocketBaseClient';

export async function getScoresForLeaderBoardTable(quizId: string, selectedScoreId?: string) {
    let dscores = await pb.collection('scores').getList(1, 10, 
        { filter: `quiz_id~"${quizId}"`, sort: '-score', expand: 'user_id'}
    );
    let mapped = await Promise.all(dscores.items.map(async (value) => {
        let itemsBefore = await pb.collection('scores').getList(1,1, 
            { filter: `quiz_id~"${quizId}" && score>${value.score}`}
        )
        return {
            ...value,
            selected: false,
            index: itemsBefore.totalItems + 1,
        }
    }));

    
    if(selectedScoreId != undefined) {
        try{
            let selectedS = await pb.collection('scores').getOne(selectedScoreId,
                { expand: 'user_id' }
            );

            let alreadyContained = mapped.find((x) => x.id == selectedS.id);
            if(alreadyContained == undefined) {
                let itemsBefore = await pb.collection('scores').getList(1,1, 
                    { filter: `quiz_id~"${quizId}" && score>${selectedS.score}`}
                )
                mapped = mapped.concat({...selectedS, selected: true, index: itemsBefore.totalItems + 1});
            }
            else
                alreadyContained.selected = true;
        }
        catch(error: any) {
            console.error(error);
        }
    }
    return mapped;
}

export default function LeaderBoardTable({ quizScores }: { quizScores: any[] }) {
    return (
        <>
        <Table aria-label="Eredmény táblázat">
            <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Név</TableColumn>
                <TableColumn>Helyes válaszok</TableColumn>
                <TableColumn>Pontszám</TableColumn>
            </TableHeader>
            
            <TableBody emptyContent={"Nincsenek eredmények."}>
            {
                quizScores.map((score : any, index : number) => {
                    
                    let st = score.selected ? {background: "gainsboro"} : {};
                    return (
                    <TableRow key={index + 1} style={st}>
                        <TableCell>{score.index}.</TableCell>
                        <TableCell>{score.expand.user_id.username}</TableCell>
                        <TableCell>{score.correct_answers}</TableCell>
                        <TableCell>{score.score}</TableCell>
                    </TableRow>
                );
                }) ?? []
            }
            </TableBody>
        </Table>
        </>
    )
}  