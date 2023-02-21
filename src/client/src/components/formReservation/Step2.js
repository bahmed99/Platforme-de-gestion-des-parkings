
import React, { useEffect, useState } from 'react'
import "../../assets/css/formReservation.css"
import axios from 'axios'

export default function Step2(props) {
    useEffect(() => {
        axios.get('http://localhost:5000/parking/codepostal/' + props.codePostal).then(res => {
            setParkings(res.data)
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }, [])

    const [parkings, setParkings] = useState([])

    function Back(){
        props.back()
    }
    function HandleSelectParking(e){
        props.setId_parking(e.target.value)
        props.setNomParking(e.target.options[e.target.selectedIndex].text)
        
    }

    function NextStep(){
        if(props.id_parking!==""){
            props.next()
        }
        else{
            alert("Veuillez choisir un parking")
        }
    }
    return (
        <div className="FormContainer">
            <div className="Form">
                <div className="Form-form">

                    <p className="Form-text">Choissisez le parking </p>
                    <div className="field-container -username">
                        <select className="" onChange={(e)=>HandleSelectParking(e)}>
                            <option value="">--Selectionner le parking--</option>
                            {parkings.map((parking, index) => {
                                return (
                                    <option  value={parking.num_parking} key={index}>{parking.adresse_parking}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div><button className='FormBtn' onClick={Back}>&laquo; Retour</button>
                        <button className='FormBtn' onClick={NextStep}>Suivant &raquo;</button></div>

                </div>
            </div>
        </div>
    )
}
