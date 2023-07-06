import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const GraphComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('data.json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Veri getirme hatası:', error);
    }
  };

  const createChart = () => {
    const labels = data.map((item) => item.label);
    const values = data.map((item) => item.value);

    const chartData = [
      {
        x: labels,
        y: values,
        type: 'bar',
        marker: {
          color: 'rgba(75, 192, 192, 0.6)',
        },
      },
    ];

    const layout = {
      title: 'Veri Grafiği',
      xaxis: {
        title: 'Etiketler',
      },
      yaxis: {
        title: 'Değerler',
      },
    };

    return (
      <Plot
        data={chartData}
        layout={layout}
        style={{ width: '100%', height: '400px' }}
      />
    );
  };

  return (
    <div>
      {data.length > 0 ? (
        createChart()
      ) : (
        <p>Veriler yükleniyor...</p>
      )}
    </div>
  );
};

export default GraphComponent;
