import React,{useEffect,useState} from 'react'
import '../assets/css/avgSpaceAvailablePerParking.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
export default function AvgSpaceAvailablePerParking() {
  const [availablespace, setAvailablespace] = useState([])
  const[Avg,setAvg]=useState([])
  const [parkingName, setParkingName] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/parking`).then(res => {
      setParkingName(res.data)
     
    }
    ).catch(err => {
        console.log(err)
    }
    )
    axios.get(`http://localhost:5000/statistique/avgSpaceAvailablePerParking`).then(res => {
      setAvg(res.data)
  
  
    }
    ).catch(err => {
        console.log(err)
    }
    )



}, [])
    ChartJS.register(ArcElement, Tooltip, Legend);
     function construireData(i){
      const data = {
        labels: [ 'Places disponibles', 'Places occupées'],
        datasets: [
        {
          label: 'Nombre de place en % ',
          data: [Avg[i].moy * 100 , 100 - Avg[i].moy * 100],
          backgroundColor: [
            'rgba(75, 192, 192, 0.3)',
            'rgba(255, 99, 132, 0.3)',
           
        
       
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
           
      
          ],
          borderWidth: 1,
        },
      ],
    };
    return data;
     }
     console.log(parkingName)

  return (
    <div className='Avgpage'>
      {Avg.map((item, i) => {
        const result = parkingName.find(({ num_parking }) => num_parking === item.num_parking);
        return (
          <div className="chart">
            <h2 className='avgtitle'> Moyenne du nombre de places disponibles pour le parking : {result.nom_parking} , {result.adresse_parking}</h2>
            <Doughnut data={construireData(i)} />
          </div>
        );
      })}
    
    </div>
    
   
  )
}
