import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export default function RankParking(props) {
    const [data, setData] = useState([])
    useEffect(() => {

      const getRankedParking = async () =>{
      const rank=  await axios.get(`http://localhost:5000/statistique/leastUsedParking`)
      const data_copy=[{

        x: [],
    
        y: [],
    
        type: 'bar'
    
      }];

      rank.data.map((rank) => {
          
          data_copy[0].x.push(rank.nom_parking)

          data_copy[0].y.push(rank.count)
  
      })
           setData(data_copy)
    }
       
        getRankedParking()


    }, [])

   
    return (
      <div className='stat-container'>
         <Plot  data={data} layout={{ width: 1000, height: 700, title: 'Classement des parkings les moins utilisés' }}  />
      </div>
    )
}
