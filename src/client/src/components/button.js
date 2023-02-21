import React,{useState}from "react";

export default function Button() {
    const [nom,setNom] = useState("ilyes");
    function changerNom(){
        setNom("Ahmed");
    }
  return (
    <div>
      <h1> mon nom est : {nom}</h1>
      <button onClick={changerNom}>Click me</button> 
      
    </div >
  
  );
}