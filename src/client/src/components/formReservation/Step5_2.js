import React, { useEffect, useState } from 'react'
import '../../assets/css/step6.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { addMinutes } from 'date-fns';

export default function Step5_2(props) {
    const [places, setPlaces] = useState([])
    const [reservedPlaces, setReservedPlaces] = useState([])
    const [reservedPlacesID, setReservedPlacesID] = useState([])
    const [date_heure_entree, setDate_heure_entree] = useState("")


    //regler la format de date
    const date_date = props.date.split('T')[0];
    const date_heure = props.date.split('T')[1];

    //concatenation de la date et de l'heure



    useEffect(() => {
        axios.get(`http://localhost:5000/place/numparking/${props.num_parking}`).then(res => {
            setPlaces(res.data)
        }
        ).catch(err => {
            console.log(err)
        }
        )
        axios.get(`http://localhost:5000/place/notdisponible/${props.num_parking}/${props.date}/${props.duree}`).then(res => {
            setReservedPlaces(res.data)
            //fill the array with the id of the reserved places
            for (let i = 0; i < res.data.length; i++) {
                reservedPlacesID.push(res.data[i].id_place)
            }
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }, [])

    /* add reservation */
    const addReservation = (id_place) => {
        let x =new Date(props.date)
        x=addMinutes(x,props.duree)
       x=x.toLocaleString();
       let x1=x.split(' ')[0]
       let x2=x.split(' ')[1]
        x1=x1.split('/')[2]+'-'+x1.split('/')[1]+'-'+x1.split('/')[0]
       x=x1+' '+x2
        const reservation = {
            "id_place": id_place,
            "date_heure_entree": props.date.split('T')[0] + " " + props.date.split('T')[1],
            "duree_reservation": props.duree,
            "car":props.car,
            "date_heure_sortie": x.toLocaleString(),


        }
        axios.post(
            "http://localhost:5000/reservation/newreservation",
            reservation,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("jwt")
                }
            }).then((response) => {
                if (response.status === 200) {
                    props.Navigate("/")
                    Swal.fire({
                        icon: 'success',
                        title: 'Réservation réussite',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })
            .catch((error) => {
                console.log("une erreur s'est produite")
                console.log(error)
                Swal.fire({
                    title: 'Erreur!',
                    text: " Une erreur s'est produite",
                    icon: 'error',
                    showDenyButton: true,
                    showConfirmButton: false,
                    denyButtonText: `Réessayer`,

                })
            });
    }





    const pop_up = (num_place) => {
        const place = reservedPlaces.find(place => place.numero_place === num_place)
        const date_entree = place.date_heure_entree
        const heure_entree = date_entree.split('T')[1].split('.')[0];
        const date_sortie = place.date_heure_sortie
        const heure_sortie = date_sortie.split('T')[1].split('.')[0];
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Cette place est reservée de ${heure_entree} à ${heure_sortie} `,

        })

    }
    const checkPlace = (place) => {
        if (reservedPlacesID.includes(place.id_place)) {
            return (
                <div class="place">
                    <input className='input_auth'type="checkbox" disabled id={place.id_place} />
                    <label className='label_auth' onClick={() => pop_up(place.numero_place)} for={place.id_place}> {place.numero_place} </label>
                </div>
            )
        }
        else {
            return (
                <div class="place">
                    <input className='input_auth' type="checkbox" id={place.id_place} />
                    <label className='label_auth' onClick={() => { addReservation(place.id_place) }} for={place.id_place}> {place.numero_place} </label>
                </div>
            )
        }
    }

    return (
        <div className="FormContainer">
             <div className="Form">
                 <div className="Form-form-parking">

                    <div className='parking_page'>
                            <h1 className='Form-heading parking_name'>Réservez votre place dès ce moment ! </h1>
                            <p className='Form-text'> Date : {date_date} </p>
                            <div className='parks'>
                                {places.map((place) => {
                                    return (
                                        checkPlace(place)
                                    )
                                })}
                            </div>
                        </div>
                
                </div>
             </div>
         </div>
    )
}
