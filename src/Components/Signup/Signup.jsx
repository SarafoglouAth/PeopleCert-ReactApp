import React, { useState } from "react";
import { Button } from 'primereact/button';
import PersonalDetails from './PersonalDetails';
import ContactInfo from './ContactInfo';
import AddressInfo from './AddressInfo';
import IdInfo from "./IdInfo";
import UsernamePassword from "./UsernamePassword";
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style.css';

export const LoginSignup = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

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
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <Card className="p-shadow-3 p-text-center p-p-3 p-border-radius-sm p-font-semibold">
        {step === 0 && <UsernamePassword personalDetails={formData} onInputChange={onInputChange} />}
        {step === 1 && <PersonalDetails personalDetails={formData} onInputChange={onInputChange} />}
        {step === 2 && <IdInfo personalDetails={formData} onInputChange={onInputChange} />}
        {step === 3 && <ContactInfo personalDetails={formData} onInputChange={onInputChange} />}
        {step === 4 && <AddressInfo personalDetails={formData} onInputChange={onInputChange}/>}
        <br />
        <Button label="Prev" className="p-mr-2 p-rounded" onClick={prevStep} />
        <Button label="Next" className="p-mr-2 p-rounded" onClick={nextStep} />
        <Button label="Submit" className="p-rounded" onClick={handleSubmit} />
      </Card>
    </div>
  );
};

export default LoginSignup;
