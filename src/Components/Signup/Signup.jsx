import React, { useState } from "react";
import { Button } from 'primereact/button';
import PersonalDetails from './PersonalDetails'
import ContactInfo from './ContactInfo'
import AddressInfo from './AddressInfo'
import IdInfo from "./IdInfo";
import { Card } from 'primereact/card';
        

export const LoginSignup = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // window.alert("Form submitted successfully!");
  };

  const onInputChange = (e) => {

    const { name, value } = e.target;
    setFormData(prev => {
      return { ...prev, [name]: value }
    })
  }

  return  <Card title="Title" style={{width: '450px'}}>
    {step === 0 && <PersonalDetails personalDetails={formData} onInputChange={onInputChange} />}
    {step === 1 && <IdInfo personalDetails={formData} onInputChange={onInputChange} />}
    {step === 2 && <ContactInfo personalDetails={formData} onInputChange={onInputChange} />}
    {step === 3 && <AddressInfo personalDetails={formData} onInputChange={onInputChange}/>}
    <br />
    <Button label="Prev" rounded onClick={prevStep}/>
    <Button label="Next" rounded onClick={nextStep}/>
    <Button label="Submit" rounded onClick={handleSubmit}/>
  </Card>
}

export default LoginSignup;


