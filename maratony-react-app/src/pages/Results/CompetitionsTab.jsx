import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Button } from '@mui/material';
import ResultsRow from './ResultsRow';

const CompetitionsTab = ({ isLogged }) => {
    const [competitions, setCompetitions] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    const handleToggleRow = (competitionID) => {
        const isRowExpanded = expandedRows.includes(competitionID);
        if (isRowExpanded) {
            setExpandedRows((prevRows) => prevRows.filter((id) => id !== competitionID));
        } else {
            setExpandedRows((prevRows) => [...prevRows, competitionID]);
        }
    }

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
    
    return (<>
        {isLogged ? (
        <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', marginTop: '16px', backgroundColor: 'transparent' }}>
            <Table style={{ backgroundColor: 'white', border: '4px solid black', color: 'black' }}>
                <TableHead>
                    <TableRow style={{ backgroundColor: '#3f51b5', color: 'white', borderBottom: '2px solid black' }}>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Name</TableCell>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Date</TableCell>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Location</TableCell>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Payment</TableCell>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Organizer</TableCell>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Description</TableCell>
                    <TableCell style={{ borderBottom: '2px solid black' }}>Results</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {competitions.map((competition) => (
                    <React.Fragment key={competition.ID_competition}>
                        <TableRow style={{ borderBottom: '2px solid black' }}>
                        <TableCell style={{ color: 'black', fontWeight: 'bold' }}>{competition.name}</TableCell>
                        <TableCell style={{ color: 'black' }}>{competition.date}</TableCell>
                        <TableCell style={{ color: 'black' }}>{competition.location}</TableCell>
                        <TableCell style={{ color: 'black', fontWeight: 'bold' }}>{competition.entryfee}</TableCell>
                        <TableCell style={{ color: 'black' }}>{competition.organizer}</TableCell>
                        <TableCell style={{ color: 'black' }}>{competition.body}</TableCell>
                        <TableCell style={{ color: 'black' }}>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleToggleRow(competition.ID_competition)}
                            >
                            {expandedRows.includes(competition.ID_competition) ? 'Hide' : 'Show'}
                            </Button>
                        </TableCell>
                        </TableRow>
                        {expandedRows.includes(competition.ID_competition) && (
                        <TableRow s>
                            <ResultsRow competitionID={competition.ID_competition}/>
                        </TableRow>
                        )}
                    </React.Fragment>
                    ))}
                </TableBody>
                </Table>
        </TableContainer>
        ) : (<></>) }</>
    );
};

export default CompetitionsTab;
