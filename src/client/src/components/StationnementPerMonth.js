import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import axios from 'axios';

export default function StationnemetnPerMonth() {
    const [data, setData] = useState([]);
    useEffect( () => {

        ///get all vehicule 
        const data_copy=[];
        const getAllvehicule = async () => {
        const  vehicule_fetch= await axios.get(`http://localhost:5000/vehicule/all`) 

        vehicule_fetch.data.map((vehicule) => {

            data_copy.push({
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    type: 'bar',
                    name: vehicule.num_immatriculation,
            })

        })
        for (let month = 1; month <= 12; month++) {
           let fetch_co= await axios.get(`http://localhost:5000/statistique/avgCostParkingVehiculePerMonth/${month}`)
                fetch_co=fetch_co.data
                    for (let i = 0; i < fetch_co.length; i++) {
                        for (let j = 0; j < data_copy.length; j++) {
                            if (fetch_co[i].num_immatriculation === data_copy[j].name) {
                                data_copy[j].y[month - 1] += fetch_co[i].avg
                            }
                        }
                    }
               
              
        }
        setData(data_copy)

    }
    getAllvehicule()

    }, [])


    return (
        <div className='stat-container'>
            <Plot data={data} layout={{ width: 1000, height: 700, title: "Le coût moyen du stationnement d'un véhicule par mois" }} />
        </div>
    )}
