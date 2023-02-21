import React from 'react'
import "../../assets/css/formReservation.css"
import axios from "axios"


export default function Step1(props) {
    function NextStep(){
        if(props.codePostal!==""){
            axios.get(`http://localhost:5000/commune/${props.codePostal}`).then(res=>{
                if(res.data.message){
                    props.setId_parking("")
                        props.next()

                }else{
                    alert("Code postal invalide")
                }

            }).catch(err=>{
                console.log(err)
            })

        }
        else {
            alert("Veuillez remplir le champs")
        }

    }

    function Back(){
        props.back()
    }
    
    return (
        <div className="FormContainer">
            <div className="Form">
                <div className="Form-form">
                    
                    <p className="Form-text">Choisir le code postal afin de consulter les parkings </p>
                    <div className="field-container -username">
                        <input type="text" value={props.codePostal}placeholder="Code postal*" onChange={(e)=>props.setCodePostal(e.target.value)} />
                    </div>
                    <div><button className='FormBtn' onClick={Back}>&laquo; Retour</button>
                        <button className='FormBtn' onClick={NextStep}>Suivant &raquo;</button></div>
                </div>
            </div>
        </div>
    )
}
