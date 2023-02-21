import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function End_Reservation() {
    const Navigate = useNavigate()

    function Quit(){
      axios.put(`http://localhost:5000/place/free`, {
        imm_voiture: localStorage.getItem("num_immatriculation"),
        date_heure_entree: localStorage.getItem("date_heure_entree"),
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("jwt")
        }
      }).then(rep => {
        Swal.fire({
          icon: 'success',
          title: 'Vous avez quitté le parking',
          showConfirmButton: false,
          timer: 2000
        })

        localStorage.removeItem("place")
        localStorage.removeItem("num_immatriculation")
        localStorage.removeItem("date_heure_entree")
          setTimeout(() => {Navigate("/");window.location.reload()}, 500);
      }).catch(err => {
        console.log(err)
        })
      
    }
  return (
    <div className="FormContainer">
      <div className="Form">
        <div className="Form-form">

          <p className="Form-text">Votre occupation actuelle: </p>
          <div className="field-container -username">
          <p>Vous avez occupé la place: {localStorage.getItem("place")}</p>
            </div>
          <div className="field-container -username">
          
            <p>La date d'entrée : { Date(localStorage.getItem("date_heure_entree"))}</p>
            
          </div>
          <div className="field-container -username">
          <p>Numero d'immatriculation: {localStorage.getItem("num_immatriculation")}</p>
          </div>
          <button className='FormBtn' onClick={Quit} >Sortir du parking</button>

        </div>

      </div>
    </div>
  )
}
