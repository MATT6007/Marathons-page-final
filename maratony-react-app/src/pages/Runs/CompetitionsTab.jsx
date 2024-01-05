import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';

const CompetitionsTab = ({ isLogged }) => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchCompetitions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me/competitions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompetitions(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych o zawodach:', error);
            }
        };

        if (token) {
            fetchCompetitions();
        }
    }, []);

    return (
        <TableContainer component={Paper} style={{ margin: 'auto', marginTop: '16px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Organizer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {competitions.map((competition) => (
                        <TableRow key={competition.ID_competition}>
                            <TableCell>{competition.name}</TableCell>
                            <TableCell>{competition.description}</TableCell>
                            <TableCell>{competition.organizer}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompetitionsTab;
