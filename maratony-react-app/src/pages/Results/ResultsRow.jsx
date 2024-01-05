import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, Collapse, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const ResultsRow = ({ competitionID }) => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/results/${competitionID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResults(response.data);
        setError(null);
      } catch (error) {
        console.error('Błąd podczas pobierania wyników z backendu:', error);
        setError('Wystąpił błąd podczas pobierania wyników.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [competitionID]);

  const handleToggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={7} style={{ textAlign: 'center' }}>
          <Button onClick={handleToggleResults} variant="contained" color="success">
            {showResults ? 'Hide' : 'Show'} 
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ textAlign: 'center' }}>
          <Collapse in={showResults}>
            <Box padding="16px" style={{ textAlign: 'left' }}>
              {/* <Typography sx={{color:'black'}} variant="h6">Results:</Typography> */}
              {loading ? (
                <Typography sx ={{color:'black'}} >Loading...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <table style={{ margin: 'auto', color:'black' }}>
                  <thead>
                    <tr>
                      <th>First Name Runner</th>
                      <th>Last Name Runner</th>
                      <th>Full Time</th>
                      <tr/>
                      <th>Half Time</th>
                      <tr/>
                      <th>Is started</th>
                      <th>Is disqualified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.ID_competition}>
                        <td>{result.runner.first_name}</td>
                        <td>{result.runner.second_name}</td>
                        <td style={{fontWeight:'bold'}}>{result.full_time}</td>
                        <tr/>
                        <td>{result.half_time}</td>
                        <tr/>
                        {result.is_started ? (<td> {'Yes'} </td>) : (<td>{'No'}</td>)}
                        {result.is_disqualified ? (<td> {'Yes'} </td>) : (<td>{'No'}</td>) }
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ResultsRow;
