import React, { useState } from 'react'
import {
    Button,
    FormGroup,
    Form,
    Input,
    Modal,
    Label,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";

import axios from 'axios'

export default function ModelAddVehicule(props) {

    const [etat, setEtat] = useState("")
    const [kilometrage, setKilometrage] = useState("")
    const [marque, setMarque] = useState("")
    const [immatriculation, setImmatriculation] = useState("")
    const [date, setDate] = useState("")
    function AddCar(e){
        e.preventDefault();
        const data={
            num_immatriculation: immatriculation,
            marque: marque,
            kilometrage: kilometrage,
            etat: etat,
            date_mise_circulation: date
        }
        axios.post("http://localhost:5000/vehicule", data, {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            }
        }).then(res => {
            props.setCar(car=>[...car, data])
            props.setShowForm(false)

        }).catch(err => {
            console.log(err)
        })}
    return (
        <Modal isOpen={props.showForm} >
            <ModalHeader  charCode="Y">Ajouter une véhicule</ModalHeader>
            <ModalBody>

                <Form onSubmit={(e)=>AddCar(e)}>
                    <FormGroup>
                        <Label >Num d'immatriculation</Label>
                        <Input type="text"  placeholder="Num d'immatriculation*" required onChange={(e)=>setImmatriculation(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label >Marque</Label>
                        <Input type="text"  placeholder="Marque*" required  onChange={(e)=>setMarque(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label >Kilometrage</Label>
                        <Input type="number"  placeholder="Kilométrage*" required onChange={(e)=>setKilometrage(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label >Etat de la voiture</Label>
                        <Input type="text"  placeholder="Etat de la voiture*" required onChange={(e)=>setEtat(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label >Date de mise en circulation</Label>
                        <Input type="date" required onChange={(e)=>setDate(e.target.value)}/>
                    </FormGroup>
                    <ModalFooter>
                <Button type="submit" color="primary" >Ajouter</Button>{' '}
                <Button color="secondary" onClick={()=>props.setShowForm(false)}>Annuler</Button>
            </ModalFooter>
                </Form>

            </ModalBody>
           
        </Modal>
    )
}
