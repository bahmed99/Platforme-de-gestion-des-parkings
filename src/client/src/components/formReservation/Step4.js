import React from 'react'

export default function Step4(props) {
    function Back() {
        props.back()
    }
    function NextStep() {
        if (props.date !== "" && props.duree!=="") {
            props.next()
        }
        else {
            alert("Veuillez remplir tous les champs")
        }
    }
    return (
        <div className="FormContainer">
            <div className="Form">
                <div className="Form-form">

                    <p className="Form-text">Choissisez la date et l'heure de votre réservation </p>
                    <div className="field-container -username">
                        <input type="datetime-local" className="form-input" placeholder="Date" onChange={(e)=>props.setDate(e.target.value)}/>

                    </div>
                    <div className="field-container -username">
                    <input type="number" placeholder="Durée de la réservation*" className="form-input"  onChange={(e)=>props.setDuree(e.target.value)}/>
                    </div>
                    <div><button className='FormBtn' onClick={Back}>&laquo; Retour</button>
                        <button className='FormBtn' onClick={NextStep}>Suivant &raquo;</button></div>

                </div>
            </div>
        </div>
    )
}
