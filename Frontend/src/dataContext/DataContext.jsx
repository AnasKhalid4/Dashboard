// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]); 
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sectorinsights'); 
      const newData = await response.json();
      setData(newData);
      
    } catch (error) {
      console.error('Error fetching  in data');
    }
  };

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
