import React, { useState } from "react"
import {  useNavigate } from "react-router-dom"
import '../../assets/css/formReservation.css'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Step1 from "./Step1"
import Step2 from "./Step2"

import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5_1 from "./Step5_1";
import Step0 from "./Step0";
import Step5_2 from "./Step5_2";


const useStyles = makeStyles((theme) => ({
    root: {
        display:'block'    
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['', '', '','',''];
}


export default function Form() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [codePostal, setCodePostal] = useState("");
    const [id_parking, setId_parking] = useState("");
    const [nomParking, setNomParking] = useState("");
    const [reservation, setReservation] = useState(true);
    const [date, setDate] = useState("");
    const [car,setCar]=useState("");
    const [duree, setDuree] = useState("");
    const [place, setPlace] = useState("")
    const Navigate = useNavigate()
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleNext2 = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
    };

    const handlePrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="FormContainer">
            <div className="Form-header">
                <div className={classes.root}>
                    
                    <Stepper   activeStep={activeStep}  alternativeLabel >
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel></StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </div>
            {activeStep === 0 && <Step0 setCar={setCar} car={car} next={handleNext} step={activeStep} length={steps.length}/>}
            {activeStep === 1 && <Step1 back={handlePrevious} setId_parking={setId_parking} codePostal={codePostal} setCodePostal={setCodePostal}next={handleNext} step={activeStep} length={steps.length}/>}
            {activeStep === 2 && <Step2 setNomParking={setNomParking} setId_parking={setId_parking} codePostal={codePostal} next={handleNext} back={handlePrevious}step={activeStep} length={steps.length}/>}
            {activeStep === 3 && <Step3 num_parking={id_parking} car={car} place={place} setPlace={setPlace} next2={handleNext2} reservation={reservation} setReservation={setReservation} setId_parking={setId_parking} next={handleNext} back={handlePrevious}step={activeStep} length={steps.length}/>}
            {activeStep === 4  && <Step4  setDuree={setDuree} date={date} setDate={setDate}   next={handleNext} back={handlePrevious}step={activeStep} length={steps.length}/>}
            {activeStep === 5 &&!reservation && <Step5_1 msg={place}  next={handleNext} step={activeStep} length={steps.length}/>}
            {activeStep === 5 &&reservation && <Step5_2 car={car} Navigate={Navigate} num_parking={id_parking} date={date}  setReservation={setReservation} duree={duree} step={activeStep} length={steps.length}/>}
        </div>
    )
}