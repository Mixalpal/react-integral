import React, { useState } from 'react';
import { useData } from './DataProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const IntegralCalculator = () => {
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [numPartitions, setNumPartitions] = useState('');
  const [integrals, setIntegrals] = useState([]);
  const [error, setError] = useState('');

  const { chartData, setChartData } = useData();

  const validateInput = (value) => {
    if (isNaN(value)) {
      setError('Введите числовое значение');
      return false;
    }
    setError('');
    return true;
  };

  const calculateIntegral = async () => {
    if (!validateInput(lowerLimit) || !validateInput(upperLimit) || !validateInput(numPartitions)) {
      return;
    }
  
    const lower = parseFloat(lowerLimit);
    const upper = parseFloat(upperLimit);
    const partitions = parseInt(numPartitions);
  
    try {
      console.log('server request');
      const response = await fetch(`/Integral/calculateIntegral?SplitNumbers=${partitions}&UpLim=${upper}&LowLim=${lower}`); // http://localhost:8080
      
      
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }
  
      const result = await response.json();

      console.log('From Server result -', result);
        
      setIntegrals([...integrals, result]);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  

  const clearFields = () => {
    setLowerLimit('');
    setUpperLimit('');
    setNumPartitions('');
    setIntegrals([]);
    setChartData(null);
  };

  const plotChart = () => {
    if (!validateInput(lowerLimit) || !validateInput(upperLimit) || !validateInput(numPartitions)) {
      return;
    }

    const data = {
      labels: [],
      datasets: [
        {
          label: 'ln(x)^2 / x',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    };

    for (let x = parseFloat(lowerLimit); x <= parseFloat(upperLimit); x += (parseFloat(upperLimit) - parseFloat(lowerLimit)) / 100) {
      data.labels.push(x);
      data.datasets[0].data.push(integralFunc(x));
    }

    setChartData(data);
  };

  const removeIntegral = (index) => {
    const updatedIntegrals = [...integrals];
    updatedIntegrals.splice(index, 1);
    setIntegrals(updatedIntegrals);
  };

  const integralFunc = (x) => {
    return (Math.pow(Math.log(x), 2) / x);
  };

//   <div>
//   {chartData && <Graph chartData={chartData} />}
// </div>

  return (
    <div className="container-fluid bg-dark text-light p-4 d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
      <div className="mb-4">
        <h2>Интеграл калькулятор</h2>
        <div className="form-group mb-2">
          <input
            type="text"
            placeholder="Нижний предел"
            value={lowerLimit}
            onChange={(e) => setLowerLimit(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            placeholder="Верхний предел"
            value={upperLimit}
            onChange={(e) => setUpperLimit(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            placeholder="Количество разбиений"
            value={numPartitions}
            onChange={(e) => setNumPartitions(e.target.value)}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button onClick={calculateIntegral} className="btn btn-primary me-2">Рассчитать интеграл</button>
        <button onClick={clearFields} className="btn btn-secondary me-2">Очистить поля</button>
        <button onClick={plotChart} className="btn btn-success">Построить график</button>
      </div>
      <div>

      </div>
      <h2>Рассчитанные интегралы:</h2>
      <div className="mt-4" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <ul className="list-group">
          {integrals.map((integral, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {integral}
              <button onClick={() => removeIntegral(index)} className="btn btn-danger">Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntegralCalculator;
