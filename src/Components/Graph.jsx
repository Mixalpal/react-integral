import React from 'react';
import { Line } from 'react-chartjs-2';
import { useData } from './DataProvider';
import 'chart.js/auto';

const Graph = () => {

  const { chartData } = useData();

  return(
    <div className="container-fluid bg-dark text-light p-0 m-0" style={{ height: '100vh' }}>
      <div className="container bg-dark p-2" style={{ height: '90vh' }}>
        <h2 className="graph-title">График функции</h2>
        {chartData && <Line data={chartData} options={{ maintainAspectRatio: true, responsive: true }} />}
      </div>
    </div>
  );
};

export default Graph;
