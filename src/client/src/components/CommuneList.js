import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/ParkingsList.css'
import commune_logo from '../assets/images/commune.png'

export default function () {
  const [communes, setCommunes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/commune').then(res => {
      setCommunes(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className='parkinglistpage'>
      <img src={commune_logo} alt='parking' className='parkingimg' />
      <h2 className='parkinglisttitle'> Liste des communes disponibles : </h2>
      <ListGroup as="ol" numbered>
        {communes.map((commune) => {
          return (
            <ListGroup.Item key={commune.code_postale}
              className="d-flex justify-content-between align-items-start"
            >

              <div className="ms-2 me-auto">
                <a href={`http://localhost:3000/commune/${commune.code_postal}`} >
                  <div className="fw-bold"> {commune.nom_commune}</div>
                  {commune.code_postal}
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
