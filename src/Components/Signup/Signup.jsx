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
import { useSignUp } from "./useSignUp";


export const LoginSignup = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    "username": "admin", "password": "admin", "firstName": "nikos", "lastName": "nikos", "birthdate": "2024-01-24T22:00:00.000Z", "nativeLanguage": "Afrikaans", "gender": "male", "idnumber": "3242", "idtype": 0, "idissuedate": "2024-01-14T22:00:00.000Z", "email": "nkperperidis@gmail.com", "mobilenumber": "689354564", "landlinenumber": "325454564", "adress": "Αντωνίου Χρηστομάνου 28-30", "province": "Αττική", "city": "ΑΘΗΝΑ", "postalcode": "10443", "adressLine2": "asdasd", "countryofresidence": "Albania"
  });
  const { loading, signUp } = useSignUp()

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    signUp(formData)
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
