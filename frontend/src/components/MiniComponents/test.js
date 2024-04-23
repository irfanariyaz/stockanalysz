import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {useGlobalContext} from "../../Context/UserContext";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {

    labels: ['Red', 'Green', 'Blue'],
    datasets: [
        {
            data: ['4', '4', '10', '3', '0'],
            backgroundColor: ["rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",],
        },
    ],
};

const options = {
    title: {
        display: true,
        text: 'My Doughnut Chart',
    },
};

const DoughnutChart1 = () => {
    return (
        <Doughnut data={data} options={options} />
    );
};

export default DoughnutChart1;