import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/CardStyles.css";

export default function Card(props) {
    const Navigate=useNavigate()
    const ChangePage = (e) => {
        Navigate(e);
    }
    const [cards] = useState([
        {
            title: "Réserver",
            navigate:'/reservation',
            text: `Vous pouvez réserver ou bien occuper une place parking en quelques étapes.`,
       
        },
        {
            title: "Mes Réservations",
            navigate:'/reservations',
            text: `Vous pouvez consulter vos anciennes 
            réservations.                    `,
          
        },
        {
            title: "Réglages",
            navigate:'/informations',
            text: `Vous pouvez modifier vos données personnelles et/ou ajouter une voiture.`,
        },
    ]);
    return (
        <div className="cards">
            {cards.map((card, i) => (
                <div key={i} className="card1">

                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <button onClick={()=>ChangePage(card.navigate)} className="btn">Explorer</button>
                </div>
            ))}
        </div>
    );
}