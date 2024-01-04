import { InputText } from "primereact/inputtext";
import { useState } from "react";

const ContactInfo = ({ personalDetails, onInputChange }) => {
  const [emailValid, setEmailValid] = useState(true);
  const [mobileNumberValid, setMobileNumberValid] = useState(true);
  const [landlineNumberValid, setLandlineNumberValid] = useState(true);

  const validateEmail = (value) => {
    // Basic email validation
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const validateMobileNumber = (value) => {
    // Basic mobile number validation (10 digits)
    setMobileNumberValid(/^\d{10}$/.test(value));
  };

  const validateLandlineNumber = (value) => {
    // Basic landline number validation (at least 8 digits)
    setLandlineNumberValid(/^\d{8,}$/.test(value));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Perform validation based on the input name
    switch (name) {
      case "email":
        validateEmail(value);
        break;
      case "mobilenumber":
        validateMobileNumber(value);
        break;
      case "landlinenumber":
        validateLandlineNumber(value);
        break;
      default:
        break;
    }

    // Propagate the input change to the parent component
    onInputChange(e);
  };

  return (
    <>
      <h2 className="form-title" class="text-center">Step 3</h2>
      <h3 className="section-title">Contact</h3>
      <InputText
        placeholder="Email"
        type="email"
        value={personalDetails.email}
        onChange={handleInputChange}
        name="email"
        className={!emailValid ? "p-invalid" : "w-full"}
      />
      <br />
      {!emailValid && (
        <small className="p-error">Please enter a valid email address</small>
      )}
      <br />
      <InputText
        placeholder="Mobile Number"
        type="tel"
        value={personalDetails.mobilenumber}
        onChange={handleInputChange}
        name="mobilenumber"
        className={!mobileNumberValid ? "p-invalid" : "w-full"}
      />
      <br />
      {!mobileNumberValid && (
        <small className="p-error">
          Please enter a valid 10-digit mobile number
        </small>
      )}
      <br />
      <InputText
        placeholder="Landline Number"
        type="tel"
        value={personalDetails.landlinenumber}
        onChange={handleInputChange}
        name="landlinenumber"
        className={!landlineNumberValid ? "p-invalid" : "w-full"}
      />
      <br />
      {!landlineNumberValid && (
        <small className="p-error">
          Please enter a valid landline number (at least 8 digits)
        </small>
      )}
    </>
  );
};

export default ContactInfo;
