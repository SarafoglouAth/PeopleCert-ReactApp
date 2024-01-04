import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import countries from "../../Data/countries.jsx";

const AddressInfo = ({ personalDetails, onInputChange }) => {
  const [addressValid, setAddressValid] = useState(true);
  const [provinceValid, setProvinceValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [postalCodeValid, setPostalCodeValid] = useState(true);

  const validateAddress = (value) => {
    setAddressValid(value.trim().length > 0);
  };

  const validateProvince = (value) => {
    setProvinceValid(value.trim().length > 0);
  };

  const validateCity = (value) => {
    setCityValid(value.trim().length > 0);
  };

  const validatePostalCode = (value) => {
    // Basic postal code validation (adjust as needed)
    setPostalCodeValid(/^[a-zA-Z0-9\s]*$/.test(value));
  };
  const handlecountrieChange = (e) => {
    const { value } = e.target;
    onInputChange({ target: { name: "countryofresidence", value } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Perform validation based on the input name
    switch (name) {
      case "adress":
        validateAddress(value);
        break;
      case "province":
        validateProvince(value);
        break;
      case "city":
        validateCity(value);
        break;
      case "postalcode":
        validatePostalCode(value);
        break;
      default:
        break;
    }

    // Propagate the input change to the parent component
    onInputChange(e);
  };

  return (
    <>
      <h2 className="form-title" class="text-center">Step 4</h2>
      <h3 className="section-title">Address</h3>
      <div>
        <InputText
          placeholder="Address"
          onChange={handleInputChange}
          type="text"
          value={personalDetails.adress}
          name="adress"
          className={!addressValid ? "p-invalid" : "w-full"}
        />
      </div>
      {!addressValid && (
        <small className="p-error">Please enter a valid address</small>
      )}
      <br />
      <InputText
        placeholder="Address Line 2"
        type="text"
        value={personalDetails.adressLine2}
        onChange={onInputChange}
        name="adressLine2"
        className="w-full"
      />
      <div>
        <br />
        <Dropdown
          value={personalDetails.countryofresidence}
          onChange={handlecountrieChange}
          optionLabel="name"
          placeholder="Country of residence"
          options={countries}
          className="w-full md:w-14rem:"
        />
      </div>
      <br />
      <div>
        <InputText
          placeholder="State / Province"
          type="text"
          value={personalDetails.province}
          onChange={handleInputChange}
          name="province"
          className={!provinceValid ? "p-invalid" : "w-full"}
        />
      </div>
      {!provinceValid && (
        <small className="p-error">Please enter a valid province</small>
      )}
      <br />
      <div>
        <InputText
          placeholder="City"
          type="text"
          value={personalDetails.city}
          onChange={handleInputChange}
          name="city"
          className={!cityValid ? "p-invalid" : "w-full"}
        />
      </div>
      {!cityValid && (
        <small className="p-error">Please enter a valid city</small>
      )}

      <br />
      <div>
        <InputText
          placeholder="Postal Code"
          type="text"
          value={personalDetails.postalcode}
          onChange={handleInputChange}
          name="postalcode"
          className={!postalCodeValid ? "p-invalid" : "w-full"}
        />
      </div>
      {!postalCodeValid && (
        <small className="p-error">Please enter a valid postal code</small>
      )}
    </>
  );
};

export default AddressInfo;
