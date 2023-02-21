import React,{useState}from "react"
import '../assets/css/auth.css'
import { useNavigate } from 'react-router-dom';
import axios  from "axios"
import Swal from 'sweetalert2'


export default function Auth(props) {

    let Navigate = useNavigate()
    //States
    const [nom,setNom]=useState("")
    const [prenom,setPrenom]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loginemail,setLoginemail]= useState("")
    const [loginpassword, setLoginpassword] = useState("")
    
    //Register Form Handlers

    const handleNomChange = (e) =>{
        setNom(e.target.value)
    }
    const handlePrenomChange = (e) =>{
        setPrenom(e.target.value)
    }
    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }
  

    //User Register Handler
    const handleRegisterSubmit = ()  =>  {
 
      const user ={
        "nom":nom,
        "prenom":prenom,
        "email":email,
        "password":password,

      }
    axios({
        method: "post",
        url: "http://localhost:5000/auth/signup",
        data: user,
      })
        .then((response) => {
           if (response.status === 200) {

          Swal.fire({
            icon: 'success',
            title: 'Inscritption réussite',
            showConfirmButton: false,
            timer: 2000
          })
           }  
        })
        .catch((error) => {
            
            
            Swal.fire({
                title: 'Erreur!',
                text: error.response.data.erreur,
                icon: 'error',
                showDenyButton: true,
                showConfirmButton: false,
                denyButtonText: `Réessayer`,

              })
        });
    }
    
    

    //User Login Handler
    const handleLoginSubmit = () => {  

        const user ={
            "email":loginemail,
            "password":loginpassword,
        }
        axios({
            method: "post",
            url: "http://localhost:5000/auth/signin",
            data: user,
          })
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Vous êtes connecté(e) avec succès',
                showConfirmButton: false,
                timer: 400
              })
              localStorage.setItem("jwt", response.data.token);
              localStorage.setItem("role", response.data.role);
              if(response.data.role === "a")
              {
              setTimeout(() => Navigate("/"), 500);
              
              }
              else {
                setTimeout(() => Navigate("/"), 500);
              }
              setTimeout(() => window.location.reload(), 500);

            }
           
            
            )
            .catch((erreur)  => {
              Swal.fire({
                title: 'Erreur!',
                text: erreur.response.data.message,
                icon: 'error',
                showDenyButton: true,
                showConfirmButton: false,
                denyButtonText: `Réessayer`,
              })
           
            });
    }

    return (
        <div className="loginpage">
            <div className="main">

            <input className="input_auth" type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup"> 
                <form onSubmit={(e) => {e.preventDefault();handleRegisterSubmit()}}>
                        <label className="label_auth" htmlFor="chk" aria-hidden="true" >Inscrivez-vous</label>
                        <input className="input_auth" type="text" value={nom ?? ""} placeholder="Nom d'utlisateur" required="True" onChange={handleNomChange} />
                        <input className="input_auth" type="text" value={prenom ?? ""} placeholder="Prenom d'utlisateur" required="True" onChange={handlePrenomChange} />
                        <input className="input_auth"  type="email" value={email ?? ""} placeholder="Email" required="True" onChange={handleEmailChange} />
                        <input className="input_auth" type="password"  value={password ?? ""} placeholder="Mot de passe" required="True"  onChange={handlePasswordChange}/>
                        <button className="loginButton" type="submit">S'inscrire</button>
                        </form>
                </div>reservation
                  <div className="login">
                  <form onSubmit={(e) => {e.preventDefault();handleLoginSubmit()}}>
                        <label className="label_auth"   htmlFor="chk" aria-hidden="true" >Connectez-vous</label>
                        <div>
                        <input className="input_auth" type="email"  placeholder="Email"  value={loginemail ?? ""} required="True" onChange={(e)=> {setLoginemail(e.target.value)}} />
                        <input className="input_auth" type="password"  placeholder="Mot de passe"   value={loginpassword ?? ""} required="True"  onChange={(e)=>{setLoginpassword(e.target.value)}}/>
                        <button  className="loginButton" >Se connecter</button>
                        </div>
                   </form>   
                </div> 
                
            </div>
  
        </div>

    )
}