import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TiTick, TiTimes } from "react-icons/ti"; // Import tick and cross icons

const UsernamePassword = ({ personalDetails, onInputChange }) => {
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    length: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate Username (for example, check if it's not empty)
    if (name === "username") {
      setUsernameValid(value.trim() !== ""); // You can add more complex validation if needed
    }

    // Validate Password
    if (name === "password") {
      // Check for at least one lowercase, one uppercase, one numeric character, and minimum 8 characters
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numericRegex = /[0-9]/;
      const hasLowercase = lowercaseRegex.test(value);
      const hasUppercase = uppercaseRegex.test(value);
      const hasNumeric = numericRegex.test(value);
      const hasLength = value.length >= 8;

      // Update state for each password criterion
      setPasswordValid({
        lowercase: hasLowercase,
        uppercase: hasUppercase,
        numeric: hasNumeric,
        length: hasLength,
      });
    }

    // Call the parent onInputChange function to update the form data
    onInputChange(e);
  };

  const renderTickOrCross = (isValid) => {
    return isValid ? <TiTick color="green" size={20} /> : <TiTimes color="red" size={20} />;
  };

  const header = <h4>Password Requirements</h4>;

  const footer = (
    <small>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {renderTickOrCross(passwordValid.lowercase)} <span style={{ marginLeft: '5px' }}>At least one lowercase</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {renderTickOrCross(passwordValid.uppercase)} <span style={{ marginLeft: '5px' }}>At least one uppercase</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {renderTickOrCross(passwordValid.numeric)} <span style={{ marginLeft: '5px' }}>At least one numeric</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {renderTickOrCross(passwordValid.length)} <span style={{ marginLeft: '5px' }}>Minimum 8 characters</span>
        </li>
      </ul>
    </small>
  );


  return (
    <>
      <h2 className="form-title">Sign Up</h2>
      <div>
        <InputText
          placeholder="Username"
          type="text"
          value={personalDetails.username}
          onChange={handleInputChange}
          name="username"
          className={!usernameValid ? "p-invalid w-full" : "w-full"}
        />
        <br />
        <br />
        <Password
          placeholder="Password"
          value={personalDetails.password}
          onChange={handleInputChange}
          header={header}
          footer={footer}
          name="password"
          className={!passwordValid.lowercase || !passwordValid.uppercase || !passwordValid.numeric || !passwordValid.length ? "p-invalid w-full" : "w-full"}
          toggleMask
        />
      </div>
    </>
  );
};

export default UsernamePassword;
