import React from 'react';
import CompetitionsTab from './CompetitionsTab';
import { useAuth } from '../../contexts/AuthContext';
import CustomBanner from './CustomBanner';

const Results = () => {
  const {isLogged} = useAuth();

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

