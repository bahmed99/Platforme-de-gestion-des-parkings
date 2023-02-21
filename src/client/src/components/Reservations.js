import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../assets/css/ParkingsList.css'
import reserv from '../assets/images/reserv.png'
import { Table } from 'reactstrap';

export default function Reservations() {
  useEffect(() => {
    axios.get('http://localhost:5000/reservation/client',{
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("jwt")
      }
    }).then(res => {
      setReservations(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const [reservations, setReservations] = useState([]);
  return (
    <div className='reservationlistpage'>
    <img src={reserv} alt='parking' className='parkingimg' />
    <h2 className='parkinglisttitle'> Liste des reservations : </h2>
    
    <Table striped >
    <thead>
          <tr>
            <th>#</th>
            <th>Adresse Parking</th>
            <th>Date d'entrée</th>
            <th>Durée de réservation</th>
            <th>Montant Payé</th>
            <th>Place occupé</th>
          </tr>
    </thead>
    <tbody>
      {reservations.map((reservation,index) => {
        return (

          <tr>
          <th scope="row">{index}</th>
          <td>{reservation.adresse_parking}</td>
          <td>{reservation.date_heure_entree}</td>
          <td>{reservation.duree_reservation} min</td>
          <td>{reservation.montant} €</td>
          <td>{reservation.numero_place}</td>
          </tr>
         
        )
      })

      }
      </tbody>
    </Table>
  </div>
  )
}
