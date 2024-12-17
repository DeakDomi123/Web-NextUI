'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import pb from '../authentication/PocketBaseClient';
import Image from "next/image";
import { useProfileImage } from '../contexts/ProfileImageContext';
import avatarImages from '../assets/avatarImages';

export async function getScoresForLeaderBoardTable(quizId: string, selectedScoreId?: string) {
    let dscores = await pb.collection('scores').getList(1, 10,
        { filter: `quiz_id~"${quizId}"`, sort: '-score', expand: 'user_id' }
    );
    let mapped = await Promise.all(dscores.items.map(async (value) => {
        let itemsBefore = await pb.collection('scores').getList(1, 1,
            { filter: `quiz_id~"${quizId}" && score>${value.score}` }
        )
        return {
            ...value,
            selected: false,
            index: itemsBefore.totalItems + 1,
        }
    }));

    if (selectedScoreId != undefined) {
        try {
            let selectedS = await pb.collection('scores').getOne(selectedScoreId,
                { expand: 'user_id' }
            );

            let alreadyContained = mapped.find((x) => x.id == selectedS.id);
            if (alreadyContained == undefined) {
                let itemsBefore = await pb.collection('scores').getList(1, 1,
                    { filter: `quiz_id~"${quizId}" && score>${selectedS.score}` }
                )
                mapped = mapped.concat({ ...selectedS, selected: true, index: itemsBefore.totalItems + 1 });
            }
            else
                alreadyContained.selected = true;
        }
        catch (error: any) {
            console.error(error);
        }
    }
    return mapped;
}

const LeaderBoardTable = ({ quizScores }: { quizScores: any[] }) => {
    const { getUserAvatarUrl } = useProfileImage();
    const [avatars, setAvatars] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarPromises = quizScores.map(async (score) => {
                const user = score.expand.user_id;
                const avatarUrl = await getUserAvatarUrl(user);
                return { userId: user.id, avatarUrl };
            });

            const avatarResults = await Promise.all(avatarPromises);
            const avatarMap = avatarResults.reduce((acc, { userId, avatarUrl }) => {
                acc[userId] = avatarUrl;
                return acc;
            }, {} as { [key: string]: string });

            setAvatars(avatarMap);
        };

        fetchAvatars();
    }, [quizScores, getUserAvatarUrl]);

    return (
        <Table aria-label="Eredmény táblázat">
            <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Felhasználó</TableColumn>
                <TableColumn>Helyes válaszok</TableColumn>
                <TableColumn>Pontszám</TableColumn>
            </TableHeader>

            <TableBody emptyContent={"Nincsenek eredmények."}>
                {quizScores.map((score: any) => {
                    const user = score.expand.user_id;
                    const avatarUrl = avatars[user.id] || avatarImages['avatar1'].src;

                    let st = score.selected ? { background: "gainsboro" } : {};
                    return (
                        <TableRow key={score.id} style={st}>
                            <TableCell>{score.index}.</TableCell>
                            <TableCell>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Image
                                        src={avatarUrl}
                                        alt="Profile Picture"
                                        width={25}
                                        height={25}
                                        className="rounded-full"
                                        style={{ height: '1.75rem', width: '1.75rem' }}
                                    />
                                    <span>{user.username}</span>
                                </div>
                            </TableCell>
                            <TableCell>{score.correct_answers}</TableCell>
                            <TableCell>{score.score}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default LeaderBoardTable;