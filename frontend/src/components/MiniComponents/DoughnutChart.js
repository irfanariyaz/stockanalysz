import React, {useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
//import {Chart as ChartJS} from "chart.js/auto"
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend);
function DoughnutChart({companyDetails}) {
    const UserData   = [
        {   rating:"Strong Buy",
            value: parseInt(companyDetails?.AnalystRatingStrongBuy)},
        {
            rating:"Buy",
            value: parseInt(companyDetails?.AnalystRatingBuy)},
        {
            rating:"Hold",
            value: parseInt(companyDetails?.AnalystRatingHold)},
        {
            rating:"Sell",
            value: parseInt(companyDetails?.AnalystRatingSell)},
        {
            rating:"Strong Sell",
            value: parseInt( companyDetails?.AnalystRatingStrongSell)}];

    const userData= {
        labels: UserData.map((data) => data.rating),
        datasets: [
            {

                data:UserData.map((data)=>data.value),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],


            },
        ],
    };
    const options = {

        title: {
            display: true,
            text: 'My Doughnut cd..Chart',
        },
    };
    console.log("checking if int",UserData.map((data) => data.value));
    return (
        <Doughnut data={userData} options={options} />
    );
}

export default DoughnutChart;