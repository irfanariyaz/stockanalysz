import React from 'react';
import {Userdata} from "./data";
import {Bar} from "react-chartjs-2";

function BarGraph({companyDetails}) {
    const labels = ["PreviousClose","Open","Price"];
    const price = parseFloat(companyDetails.price)
    const previousClose = parseFloat(companyDetails.previousClose)
    const open = parseFloat(companyDetails.open)
     const chartData = {
         labels:labels,
         datasets:[{
                     label: "StockPrice",
                     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                     borderColor: 'rgba(255, 99, 132, 1)',
                     borderWidth: 1,
                     data:[ previousClose,open,price],
         }]
        // datasets: [
        //     {
        //         label: 'Prev. Close',
        //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //         borderColor: 'rgba(255, 99, 132, 1)',
        //         borderWidth: 1,
        //         data:[ parseFloat(companyDetails.previousClose)],
        //     },
        //     {
        //         label: 'Open',
        //         backgroundColor: 'rgba(54, 162, 235, 0.5)',
        //         borderColor: 'rgba(54, 162, 235, 1)',
        //         borderWidth: 1,
        //         data:[parseFloat(companyDetails.open)],
        //     },
        //     {
        //         label: 'Price',
        //         backgroundColor: 'rgba(6,81,133,0.5)',
        //         borderColor: 'rgba(54, 162, 235, 1)',
        //         borderWidth: 1,
        //         data:[parseFloat(companyDetails.price)],
        //     },
        // ],
    };
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: false,
                min: Math.min(previousClose, open, price) - 1,

            },
        },
    };
    return (
        <Bar data={chartData} options={chartOptions}
       />
);
}

export default BarGraph;