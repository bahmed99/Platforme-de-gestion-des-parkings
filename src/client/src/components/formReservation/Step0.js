import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Step0(props) {
    useEffect(() => {
        axios.get('http://localhost:5000/vehicule', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res => {
            if (res.data.length !== 0) {
                setVoitures(res.data)
            }
            else {
                alert("Vous n'avez pas de voiture, veuillez en ajouter une")
            }
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }, [])

    const [voitures, setVoitures] = useState([])
    function NextStep() {
        if (props.car !== "") {
            props.next()
        }
        else {
            alert("Veuillez choisir une voiture")
        }
    }

    function HandleSelectCar(e) {
        props.setCar(e.target.value)
    }
    return (
        <div className="FormContainer">
            <div className="Form">
                <div className="Form-form">

                    <h1 className="Form-heading">Nous sommes heureux de vous voir franchir le pas!</h1>

                    <p className="Form-text">Prêt à commencer? commencez par choisir une voiture </p>
                    <div className="field-container -username">
                        <select className="" onChange={(e) => HandleSelectCar(e)}>
                            <option value="">--Selectionner la voiture--</option>
                            {voitures.map((voiture, index) => {
                                return (
                                    <option value={voiture.num_immatriculation} key={index}>{voiture.marque}</option>
                                )
                            })}

                        </select>
                    </div>
                    <button className='FormBtn' onClick={NextStep}>Suivant &raquo;</button>
                </div>
            </div>
        </div>
    )
}
