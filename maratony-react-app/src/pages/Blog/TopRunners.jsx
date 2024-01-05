import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopRunners = () => {
    const [topRunners, setTopRunners] = useState([]);

    useEffect(() => {
        const fetchTopRunners = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/top-runners`);
                setTopRunners(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania topowych zawodników:', error);
            }
        };

        fetchTopRunners();
    }, []);

    return (
        <div>
            <h2>Top Runners</h2>
            <ul>
                {topRunners.map((runner) => (
                    <li key={runner.ID_runner}>
                        {/* Komponent wyświetlający pojedynczego topowego zawodnika */}
                        <TopRunnerItem runner={runner} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TopRunnerItem = ({ runner }) => {
    return (
        <div>
            <h3>{runner.first_name} {runner.last_name}</h3>
            <p>Races Participated: {runner.races_participated}</p>
            <p>Date of Birth: {runner.date_of_birth}</p>
            <p>Club: {runner.club}</p>
        </div>
    );
};

export default TopRunners;
