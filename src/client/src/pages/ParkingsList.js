import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/ParkingsList.css'
import parking from '../assets/images/parking.png'
export default function () {
  const [parkings, setParkings] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/parking').then(res => {
      setParkings(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className='parkinglistpage'>
      <img src={parking} alt='parking' className='parkingimg' />
      <h2 className='parkinglisttitle'> Liste des parkings disponibles : </h2>
      <ListGroup as="ol" numbered className='parkinglist'>
        {parkings.map((parking) => {
          return (
            <ListGroup.Item key={parking.num_parking} className="listitem">
              <div className="ms-2 me-auto">
                <a href={`http://localhost:3000/avg/${parking.num_parking}`} >
                  <div className="fw-bold"> {parking.nom_parking}</div>
                  {parking.adresse_parking} , {parking.code_postal}
                </a>
              </div>

            </ListGroup.Item>
          )
        })

        }
      </ListGroup>
    </div>
  )
}
