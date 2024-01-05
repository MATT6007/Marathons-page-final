import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CompetitionsTab from './CompetitionsTab';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CustomBanner from './CustomBanner';

const Results = () => {
  const [isCompetitionsVisible, setCompetitionsVisibility] = useState(false);
  const {isLogged, setIsLogged} = useAuth();

  return (
    <div>
       {isLogged ? (
        <div>
          <CustomBanner />
          <CompetitionsTab isLogged={isLogged} />
        </div>
      ) : (
        <CustomBanner/>
      )} 
    </div>
  );
};

export default Results;

