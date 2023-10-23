import { createContext, useContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);

  return (
    <DataContext.Provider value={{ chartData, setChartData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};