import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModelAddVehicule from './ModelAddVehicule'
import "../assets/css/information.css"
import Swal from 'sweetalert2'
import Navbar from './Navbar'
export default function UpdateInformation() {
  useEffect(() => {
    axios.get("http://localhost:5000/user/user", {
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("jwt")
      }
    }).then(res => {
      setNom(res.data[0].nom_personne)
      setPrenom(res.data[0].prenom_personne)
      setMail(res.data[0].email_personne)
    }).catch(err => {
      console.log(err)
    })

    //get car
    axios.get("http://localhost:5000/vehicule", {
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("jwt")
      }
    }).then(res => {
      setCar(res.data)
    }).catch(err => {
      console.log(err)
    }
    )

  }, [])
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [mail, setMail] = useState("")
  const [car, setCar] = useState([])
  const [carSelected, setCarSelected] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [etat, setEtat] = useState("")
  const [kilometrage, setKilometrage] = useState("")

  function HandleChange(e) {
    if (e.target.value === "") {
      setEtat("")
      setKilometrage("")
      setCarSelected("")
    }

    else {
      setCarSelected(e.target.value)
      setEtat(car[e.target.value].etat)
      setKilometrage(car[e.target.value].kilometrage)
    }
  }
  function Modifier(){

    if(carSelected===""){
      if (!nom || !prenom || !mail) {
        alert("Veuillez remplir tous les champs")
      }
      else{
        
          axios.put("http://localhost:5000/user", {
            "nom_personne": nom,
            "prenom_personne": prenom,
            "email_personne": mail
          }, {
            headers: {
              "Content-Type": "application/json",
              "authorization": localStorage.getItem("jwt")
    
        }}).then(res => {
    
          Swal.fire({
            icon: 'success',
            title: 'Modification de vos données effectuée avec succès',
            showConfirmButton: false,
            timer: 1000
          })
        }
        ).catch(err => {
          console.log(err)
        }
        )
      
      }


    }
    
   else
   
    if (!nom || !prenom || !mail || !etat || !kilometrage) {
      alert("Veuillez remplir tous les champs")
    }
    else{

      axios.put("http://localhost:5000/user", {
        "nom_personne": nom,
        "prenom_personne": prenom,
        "email_personne": mail
      }, {
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")

    }}).then(res => {

      axios.put("http://localhost:5000/vehicule", {
        "etat": etat,
        "kilometrage": kilometrage,
        "num_immatriculation": car[carSelected].num_immatriculation
      }, {
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        }
      }).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Modification de vos données effectuée avec succès',
          showConfirmButton: false,
          timer: 1000
        })
      }
      ).catch(err => {
        console.log(err)
      }
      )
    }
    ).catch(err => {
      console.log(err)
    }
    )

    }
    
    

}


  return (
    <div className="FormContainer">
      
      <div className="Form">
        <div className="Form-form">

          <h1 className="Form-heading">Modifier Votre profile</h1>
 
          <div className="field-container -username">
            <input type="text" placeholder="Nom*" value={nom} onChange={(e) => setNom(e.target.value)} />
          </div>
          <div className="field-container -username">
            <input type="text" placeholder="Prénom*" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          </div>
          <div className="field-container -username">
            <input type="text" value={mail} placeholder="Email*" onChange={(e) => setMail(e.target.value)} />
          </div>
          <div className="field-container -username">
            <select className="" onChange={(e) => HandleChange(e)}>
              <option value="">--Selectionner la voiture--</option>
              {car.map((voiture, index) => {
                return (
                  <option value={index} key={index}>{voiture.marque}</option>
                )
              })}

            </select>
          </div>

          {
          etat !== "" && kilometrage !== "" ? 
          <>
            <div className="field-container -username">
              <input type="text" placeholder="Kilometrage*" value={kilometrage} onChange={(e) => setKilometrage(e.target.value)} />
            </div>
            <div className="field-container -username">
              <input type="text" value={etat} placeholder="Etat*" onChange={(e) => setEtat(e.target.value)} />
            </div>
          </> : ""
          }
          <div>
            <button type="button" onClick={()=>setShowForm(true)} className='FormBtn' data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Ajouter Voiture</button>
            <button className='FormBtn' onClick={Modifier} >Modifier</button>
          </div>
        </div>
      </div>
      <ModelAddVehicule showForm={showForm} setShowForm={setShowForm} setCar={setCar}/>

    </div>
  )
}
