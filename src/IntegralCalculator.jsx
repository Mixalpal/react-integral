import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const IntegralCalculator = () => {
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [numPartitions, setNumPartitions] = useState('');
  const [integrals, setIntegrals] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  const validateInput = (value) => {
    if (isNaN(value)) {
      setError('Введите числовое значение');
      return false;
    }
    setError('');
    return true;
  };

  const calculateIntegral = () => {
    if (!validateInput(lowerLimit) || !validateInput(upperLimit) || !validateInput(numPartitions)) {
      return;
    }

    const lower = parseFloat(lowerLimit);
    const upper = parseFloat(upperLimit);
    const partitions = parseInt(numPartitions);

    const result = integrate(lower, upper, partitions);

    setIntegrals([...integrals, result]);
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

  const integrate = (lower, upper, partitions) => {
    const h = (upper - lower) / partitions;
    let sum = 0;

    for (let i = 0; i < partitions; i++) {
      sum += integralFunc(lower + h*i);
    }

    return h * ((integralFunc(lower) + integralFunc(upper)) / 2 + sum);
  };

  const integralFunc = (x) => {
    return (Math.pow(Math.log(x), 2) / x);
  };

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
        {chartData && <Line data={chartData} options={{ maintainAspectRatio: false, responsive: true}} />}
      </div>
      <div className="mt-4" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
        <h2>Рассчитанные интегралы:</h2>
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
