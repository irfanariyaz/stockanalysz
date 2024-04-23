import React from 'react';
import {Userdata} from "./data"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const LineChart = () => {
    // Extracting labels, grossProfit, and totalRevenue from data
    const labels = Userdata.map(entry =>parseInt(entry.fiscalDateEnding.substring(0,4)));
    const grossProfits = Userdata.map(entry => parseInt(entry.grossProfit)/1000000000);
    const totalRevenues = Userdata.map(entry => parseInt(entry.totalRevenue)/1000000000);
    // Bar chart data
    const chartData = {
        labels:labels,
        datasets: [
            {
                label: 'Gross Profit',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data:  grossProfits,
            },
            {
                label: 'Total Revenue',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: totalRevenues,
            },
        ],
    };

    // Bar chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value, index, ticks) {
                        return (value) + 'B'; // Divide by 1 billion and add 'B' suffix
                    }
                }
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default LineChart;