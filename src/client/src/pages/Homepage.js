import React from 'react'
import '../assets/css/Homepage.css'
import logohome from '../assets/images/logohome.png'
import AuthButton from '../components/AuthButton'
export default function Homepage() {
  return (
    <div className='homepage'>
           <div className='hometext'>   
        <h1 className='hometitle'> EasyPark  </h1>
        <p className='homeparag'>  Vous avez rencontrez toujours des problèmes pour trouver une place dans un parking?</p>
        <p className='homeparag'>EasyPark est fait pour vous, inscrivez vous et réservez votre place dès maintenant. </p>
        <AuthButton/>
    </div>
    <div>
        <img src={logohome} alt='logo' className='logohome'/>
    </div>
 
    </div>
  )
}
