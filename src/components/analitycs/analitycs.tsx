// src/components/DonutChart.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, TooltipItem } from 'chart.js';

// Registrar los elementos necesarios para el gráfico
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Presupuesto', 'Gastos', 'Balance'],
    datasets: [
      {
        data: [40, 30, 30], // Inicializa con valores por defecto
        backgroundColor: ['#4F46E5', '#3B82F6', '#10B981'],
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: TooltipItem<'doughnut'>) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          }
        }
      },
      title: {
        display: true,
        text: 'Balance Económico',
        padding: {
          top: 10,
          bottom: 20
        }
      }
    }
  };

  useEffect(() => {
    // Función para obtener datos del backend
    const fetchBalanceData = async () => {
      try {
        const response = await fetch('/api/balances/all', { // Cambia esto al endpoint real
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ grupo: 'your_group_id' }) // Cambia esto a los datos necesarios
        });

        const data = await response.json();
        
        if (data && data.length > 0) {
          // Suponiendo que `data` es una lista y tomamos el primer elemento
          const balance = data[0];
          const { presupuesto, gastosTotales, balancefn } = balance;
          setChartData({
            labels: ['Presupuesto', 'Gastos', 'Balance'],
            datasets: [
              {
                data: [presupuesto, gastosTotales, balancefn],
                backgroundColor: ['#4F46E5', '#3B82F6', '#10B981'],
                borderColor: '#ffffff',
                borderWidth: 2
              }
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching balance data:', error);
      }
    };

    fetchBalanceData();
  }, []);

  return (
    <div className="w-full bg-transparent flex flex-col justify-center items-center rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <h5 className="text-xl font-bold leading-none text-white">Balance Económico</h5>
      </div>
      <div className="py-6">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="flex justify-center gap-10 items-center pt-5">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="lastDaysdropdown"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
          type="button"
        >
          Último Mes
        </button>
        <a
          href="#"
          className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700"
          aria-current="page"
        >
          Ver más
        </a>
      </div>
    </div>
  );
};

export default DonutChart;
