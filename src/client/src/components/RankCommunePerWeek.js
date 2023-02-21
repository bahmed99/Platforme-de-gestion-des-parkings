import React, { useEffect, useState } from 'react'
import '../assets/css/avgSpaceAvailable.css'
import Plot from 'react-plotly.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RankCommunePerWeek(props) {
    const [data, setData] = useState([]);

    useEffect(() => {

        ///get all parking 
        const data_copy = [];
        const getAllCommune = async () => {
            const commune_fetch = await axios.get(`http://localhost:5000/commune`)
            let x = []
            let y = []
            for (let i = 1; i <= 52; i++) {
                x.push(i)
                y.push(0)
               
            }


            commune_fetch.data.map((commune) => {

                data_copy.push({
                    x: [...x],
                    y: [...y],
                    type: 'bar',
                    name: commune.code_postal,
                })

            })

            for (let week = 1; week <= 52; week++) {
                let fetch_co = await axios.get(`http://localhost:5000/statistique/mostRequestedMunicipalityPerWeek/${week}`)
                fetch_co = fetch_co.data
                for (let i = 0; i < fetch_co.length; i++) {
                    for (let j = 0; j < data_copy.length; j++) {
                        if (fetch_co[i].code_postal === data_copy[j].name) {
                            data_copy[j].y[week-1] += parseInt(fetch_co[i].count)
                            
                        }
                    }
                }
             }
            setData(data_copy)

                }
        getAllCommune()







    }, [])
    if (data.length == 0) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }

    return (
        <div className='stat-container'>
            <Plot data={data} layout={{ width: 1300, height: 700, title: 'Classement des communes les plus demandées par semaine' }} />
        </div>
    )
}
