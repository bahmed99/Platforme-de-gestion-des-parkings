import React, { useEffect, useState } from 'react'
import '../assets/css/avgSpaceAvailable.css'
import Plot from 'react-plotly.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RankCommune(props) {
    const { commune } = useParams();
    const [data, setData] = useState([]);

     useEffect( () => {

        ///get all parking 
        const data_copy=[];
        const getAllParking = async () => {
        const  parking_fetch= await axios.get(`http://localhost:5000/parking`) 

        parking_fetch.data.map((parking) => {

            data_copy.push({
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    type: 'bar',
                    name: parking.nom_parking,
            })

        })
        for (let month = 1; month <= 12; month++) {
           let fetch_co= await axios.get(`http://localhost:5000/statistique/mostProfitableParkingByMunicipalityAndByMonth/${commune}/${month}`)
                fetch_co=fetch_co.data
                    for (let i = 0; i < fetch_co.length; i++) {
                        for (let j = 0; j < data_copy.length; j++) {
                            if (fetch_co[i].nom_parking == data_copy[j].name) {
                                data_copy[j].y[month - 1] += fetch_co[i].sum
                            }
                        }
                    }
               
              
        }
        setData(data_copy)

    }
        getAllParking()

       


           

    
    }, [])


if(data.length==0){
    return(
        <div>
            <p>loading...</p>
        </div>
    )
}

    return (
        <div className='stat-container'>
            <Plot data={data} layout= {{width:1000,height:700,title: 'Classement des parkings les plus rentables par commune et par mois'} }/>
        </div>
    )
}
