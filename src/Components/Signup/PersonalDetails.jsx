import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import natives from "../../Data/natives.jsx";
import genderOptions from "../../Data/gender.jsx";
import { Card } from "primereact/card";

const PersonalDetails = ({ personalDetails, onInputChange }) => {
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [birthdateValid, setBirthdateValid] = useState(true);

  const handleGenderChange = (e) => {
    const { value } = e.target;
    onInputChange({ target: { name: "gender", value } });
  };

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    onInputChange({ target: { name: "nativeLanguage", value } });
  };

  const validateFirstName = (value) => {
    setFirstNameValid(value.length > 0);
  };

  const validateLastName = (value) => {
    setLastNameValid(value.length > 0);
  };

  const validateBirthdate = (value) => {
    setBirthdateValid(value !== null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Perform validation based on the input name
    switch (name) {
      case "firstName":
        validateFirstName(value);
        break;
      case "lastName":
        validateLastName(value);
        break;
      case "birthdate":
        validateBirthdate(value);
        break;
      default:
        break;
    }

    // Propagate the input change to the parent component
    onInputChange(e);
  };

  return (
    <>
      <h2 className="form-title">Sign Up</h2>
      <h3 className="section-title">Personal Details</h3>
      <div>
        <InputText
          placeholder="First / Middle Name(s)"
          type="text"
          value={personalDetails.firstName}
          onChange={handleInputChange}
          name="firstName"
          className={!firstNameValid ? "p-invalid" : ""}
        />
      </div>
      <br />
      <div>
        <InputText
          placeholder="LastName"
          type="text"
          value={personalDetails.lastName}
          onChange={handleInputChange}
          name="lastName"
          className={!lastNameValid ? "p-invalid" : ""}
        />
      </div>
      <br />
      <div>
        <Calendar
          value={personalDetails.birthdate}
          onChange={handleInputChange}
          showIcon
          name="birthdate"
          placeholder="Birth Date"
          className={!birthdateValid ? "p-invalid" : ""}
        />
      </div>
      <br />
      <div id="native-language-dropdown-container">
        <Dropdown
          value={personalDetails.nativeLanguage}
          onChange={handleLanguageChange}
          optionLabel="name"
          placeholder="Native Language"
          options={natives}
          className="w-full md:w-14rem"
        />
      </div>
      <div id="gender-dropdown-container">
        <br />
        <Dropdown
          value={personalDetails.gender}
          onChange={handleGenderChange}
          optionLabel="name"
          placeholder="Gender"
          options={genderOptions}
          className="w-full md:w-14rem"
        />
      </div>
    </>
  );
};

export default PersonalDetails;
