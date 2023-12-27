
import { InputText } from 'primereact/inputtext';
const PersonalDetails = ({ personalDetails, onInputChange }) => {
    return <div>
        <InputText placeholder="First / Middle Name(s)"
            type="text"
            value={personalDetails.firstName}
            onChange={onInputChange}
            name="firstName"
        />
        <InputText placeholder="lastName"
            type="text"
            value={personalDetails.lastName}
            onChange={onInputChange}
            name="lastName"
        />
    </div>;
}

export default PersonalDetails