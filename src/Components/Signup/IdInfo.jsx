import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import idType from "../../Data/idtype.jsx";

const IdInfo = ({ personalDetails, onInputChange }) => {
  const [idNumberValid, setIdNumberValid] = useState(true);
  const [idTypeValid, setIdTypeValid] = useState(true);
  const [idIssueDateValid, setIdIssueDateValid] = useState(true);

  const validateIdNumber = (value) => {
    setIdNumberValid(value.trim().length > 0);
  };

  const validateIdType = (value) => {
    setIdTypeValid(value !== null);
  };

  const validateIdIssueDate = (value) => {
    setIdIssueDateValid(value !== null);
  };
  const handleidtypeChange = (e) => {
    const { value } = e.target;
    onInputChange({ target: { name: "idtype", value } });
  };

  const handleIdInputChange = (e) => {
    const { name, value } = e.target;

    // Perform validation based on the input name
    switch (name) {
      case "idnumber":
        validateIdNumber(value);
        break;
      case "idtype":
        validateIdType(value);
        break;
      case "idissuedate":
        validateIdIssueDate(value);
        break;
      default:
        break;
    }

    // Propagate the input change to the parent component
    onInputChange(e);
  };

  return (
    <>
      <h2 className="form-title">Step 2</h2>
      <h3 className="section-title">ID</h3>
      <div>
        <InputText
          placeholder="ID Number"
          type="text"
          value={personalDetails.idnumber}
          onChange={handleIdInputChange}
          name="idnumber"
          className={!idNumberValid ? "p-invalid" : ""}
        />
      </div>
      {!idNumberValid && (
        <small className="p-error">Please enter a valid ID number</small>
      )}
      <br />
      <div>
        <Dropdown
          value={personalDetails.idtype}
          onChange={handleidtypeChange}
          optionLabel="name"
          placeholder="ID Type"
          options={idType}
          className={!idTypeValid ? "p-invalid" : "w-full md:w-14rem"}
        />
      </div>

      {!idTypeValid && (
        <small className="p-error">Please select an ID type</small>
      )}
      <div>
        <br />
        <Calendar
          value={personalDetails.idissuedate}
          onChange={handleIdInputChange}
          name="idissuedate"
          placeholder="ID Issue Date"
          className={!idIssueDateValid ? "p-invalid" : ""}
        />
      </div>
      {!idIssueDateValid && (
        <small className="p-error">Please select an ID issue date</small>
      )}
    </>
  );
};

export default IdInfo;
