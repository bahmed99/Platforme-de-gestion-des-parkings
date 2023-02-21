
import "../../assets/css/formReservation.css"
import axios from 'axios'
export default function Step3(props) {


    console.log(props.num_parking)
    function Back() {
        props.setId_parking("")
        props.back()
    }
    function NextStep() {
       
            if (props.reservation) {
                props.next()
            }
            else {
                axios.get(`http://localhost:5000/place/free/numparking/${props.num_parking}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("jwt")
                    }
                }).then(res => {
                    if (res.data.length !== 0) {
                        props.setPlace(res.data[0].numero_place)
                        const date_heure_entree = Date.now()
                        axios.post(`http://localhost:5000/place/occupy/${res.data[0].id_place}`, {
                            car: props.car,
                            date_heure_entree: date_heure_entree,
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": localStorage.getItem("jwt")
                            }
                        }).then(rep => {
                            props.setPlace('Vous pouvez occuper la place : ' + res.data[0].numero_place)
                            localStorage.setItem("place", res.data[0].numero_place)
                            localStorage.setItem("num_immatriculation", props.car)
                            localStorage.setItem("date_heure_entree", date_heure_entree)
                            props.next2()
                        }).catch(err => {
                            console.log(err)
                        })


                    }
                    else {
                        props.setPlace("Pas de place disponible")
                        props.next2()
                    }

                }).catch(err => {
                    console.log(err)
                }
                )

            }
        
        
    }
    
    return (
        <div className="FormContainer">
            <div className="Form">
                <div className="Form-form">

                    <p className="Form-text">Choissisez  </p>


                    <div className="grid-wrapper grid-col-auto">
                        <label  for="radio-card-1" className="label_auth radio-card" onClick={() => props.setReservation(true)}>
                            <input className='input_auth' type="radio" name="radio-card" id="radio-card-1" checked />
                            <div className="card-content-wrapper">
                                <span className="check-icon"></span>
                                <div className="card-content">
                                    <img
                                        src={require("../../assets/images/reservation.png")}
                                        alt=""
                                    />
                                    <h4>Faire une réservation</h4>
                                </div>
                            </div>
                        </label>

                        <label for="radio-card-2" className="label_auth radio-card" onClick={() => props.setReservation(false)}>
                            <input className='input_auth' type="radio" name="radio-card" id="radio-card-2" />
                            <div className="card-content-wrapper">
                                <span className="check-icon"></span>
                                <div className="card-content">
                                    <img
                                        src={require("../../assets/images/place.png")} alt=""
                                    />
                                    <h4>Occuper une place</h4>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div><button className='FormBtn' onClick={Back}>&laquo; Retour</button>
                        <button className='FormBtn' onClick={NextStep}>Suivant &raquo;</button></div>
                </div>
            </div>
        </div>
    )
}
