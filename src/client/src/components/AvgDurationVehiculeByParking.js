import React, { useEffect, useState } from 'react'
import '../assets/css/avgSpaceAvailable.css'
import axios from 'axios'
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
import { useParams } from 'react-router-dom';

export default function AvgDurationVehiculeByParking() {
    const [parkings, setParkings] = useState([])
    const [avg, setAvg] = useState([])
    const [labels, setLabels] = useState([])
    const [minutes, setMinutes] = useState([])

    let {num_parking} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/statistique/avgDurationVehiculeByParking/${num_parking}`).then(res => {
            setAvg(res.data)
            if(labels.length==0){
                res.data.map((item) => {
                    labels.push(item.num_immatriculation)
                })
        
            }
        }
        ).catch(err => {
            console.log(err)
        }
        )


    }, [])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );


   


      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: `La durée moyenne de stationnement de chaque véhicule pour le parking ${num_parking}`,
            
          },
        },
      };

     const data = {
        labels,
        datasets: [
          {
            label: 'Durée en minutes',
            data: avg.map((item) => {
                let min=0;
                if(item.avg.hours!=null){
                    min+=item.avg.hours*60;
                }
                if(item.avg.minutes!=null){
                    min+=item.avg.minutes;
                }
                if(item.avg.seconds!=null){
                    min+=item.avg.seconds/60;
                }
                return min;

            }),
            backgroundColor: 'rgba(8, 55, 163, 0.5)',
          },
      
        ],
      };
    return (
         <Bar options={options} data={data} />
    )
}
