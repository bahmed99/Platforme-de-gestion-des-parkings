import React from 'react';
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import '../assets/css/welcome.css';
// import Button from '../components/button';

export default function Welcome() {
    return (
        <div className='welcomepage'>
            {/* <h1 className='titre'>test page welcome fdqfdqfdsqfdsq!</h1>
            <div className='mybutton'>
                <Button />
            </div> */}
             <Navbar /> 
            <Card />
        </div>
    );
}