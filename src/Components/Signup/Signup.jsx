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
    <div class="h-screen flex justify-content-center align-content-center flex-wrap">
      <div class="grid w-full center">
        <div class="col-2 col-offset-5">
          <Card className="w-22rem h-auto" >
            {step === 0 && <UsernamePassword personalDetails={formData} onInputChange={onInputChange} />}
            {step === 1 && <PersonalDetails personalDetails={formData} onInputChange={onInputChange} />}
            {step === 2 && <IdInfo personalDetails={formData} onInputChange={onInputChange} />}
            {step === 3 && <ContactInfo personalDetails={formData} onInputChange={onInputChange} />}
            {step === 4 && <AddressInfo personalDetails={formData} onInputChange={onInputChange} />}
            <br />
            <Button label="Prev" className="mr-2" onClick={prevStep} />
            {step <= 3 && <Button label="Next" className="mr-2 " onClick={nextStep} />}
            {step === 4 && < Button label="Submit" onClick={handleSubmit} />}
          </Card>
        </div></div>
    </div>

  );
};

export default LoginSignup;
