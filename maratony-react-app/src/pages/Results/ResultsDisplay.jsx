import React from 'react';

const ResultsDisplay = ({ results }) => {
  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.ID_results}>
            <p>Runner: {result.runner.first_name} {result.runner.last_name}</p>
            <p>Competition: {result.competition.name}</p>
            <p>Full Time: {result.full_time}</p>
            <p>Half Time: {result.half_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;
