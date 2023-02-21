import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Step5(props) {

  const Navigate = useNavigate()
  return (
    <div className="FormContainer">
      <div className="Form">
        <div className="Form-form">

          <p className="Form-text">Votre occupation: </p>
          <div className="field-container -username">
            <p> {props.msg}</p>
          </div>
          <button className='FormBtn' onClick={()=>{Navigate("/");window.location.reload()}} >Accueil</button>

        </div>

      </div>
    </div>
  )
}
