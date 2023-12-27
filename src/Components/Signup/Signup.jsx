import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import countries from '../../Data/countries'
import PersonalDetails from './PersonalDetails'
import ContactInfo from './ContactInfo'
import AddressInfo from './AddressInfo'



// export const LoginSignup = () => {

//   const [step, setStep] = useState(1);
//   const [value, setValue] = useState('');
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     gender: "",
//     nativeLanguage: "",
//     birthDate: "",
//     address: "",
//     addressLine2: "",
//     countryofResidence: "",
//     State: "",
//     townCity: "",
//     postalCode: "",
//     landlineNumber: "",
//     mobileNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const nextStep = (e) => {
//     e.preventDefault();
//     setStep((prevStep) => prevStep + 1);
//   };

//   const prevStep = () => {
//     setStep((prevStep) => prevStep - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     console.log("Form submitted:", formData);
//     window.alert("Form submitted successfully!");
//   };

//   const renderForm = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="container">
//             <div className="header">
//               <div className="text">Sign Up</div>
//               <div className="underline"></div>
//             </div>
//             <div className="inputs">
//               <div className="input">
//                 <img src="" alt="" />
//                 <InputText placeholder="First / Middle Name(s)"
//                   type="text"
//                   value={formData.firstName} onChange={handleChange}
//                   name="firstName"
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <InputText
//                   type="text"
//                   placeholder="LastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   name="lastName"
//                 />
//               </div>

//               <div className="input">
//                 <Dropdown value={formData.nativeLanguage} onChange={handleChange} options={countries} optionLabel="name"
//                   placeholder="Select a Country" className="w-full md:w-14rem" />
//                 <br />
//                 <label>Native language</label>
//                 <label className="edit-hide"></label>
//                 <div className="selectbox-wrap">
//                   <select
//                     value={formData.nativeLanguage}
//                     className=" styled"
//                     disabled=""
//                     id="NativeLanguage"
//                     onChange={handleChange}
//                     name="nativeLanguage"
//                   >
//                     <option value="">Please choose...</option>3
//                     {countries.map((country) =>
//                       (<option value={country.id}>{country.name}</option>))}
//                   </select>
//                 </div>
//               </div>
//               <div className="Gender">
//                 <img src="" alt="" />
//                 <h3>
//                   Gender:{" "}
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   />
//                   Male
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   />{" "}
//                   Female
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   />{" "}
//                   Other
//                 </h3>
//               </div>
//               <br />
//               <button className="button-42" role="button" onClick={nextStep}>Next</button>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="container">
//             <div className="header">
//               <div className="text"></div>
//             </div>
//             <div className="inputs">
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="date"
//                   placeholder="Enter BirthDate"
//                   value={formData.birthDate}
//                   onChange={handleChange}
//                   name="birthDate"
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="text"
//                   placeholder="Native Language"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="gender"
//                   placeholder="Gender"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <br />
//               <button onClick={prevStep}>Previous</button>
//               <button onClick={nextStep}>Next</button>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="container">
//             <div className="header">
//               <div className="text"></div>
//             </div>
//             <div className="inputs">
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="date"
//                   placeholder="Enter BirthDate"
//                   value={formData.birthDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="text"
//                   placeholder="Native Language"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="gender"
//                   placeholder="Gender"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <br />
//               <button onClick={prevStep}>Previous</button>
//               <button onClick={nextStep}>Next</button>
//             </div>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="container">
//             <div className="header">
//               <div className="text"></div>
//             </div>
//             <div className="inputs">
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="date"
//                   placeholder="Enter BirthDate"
//                   value={formData.birthDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="text"
//                   placeholder="Native Language"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input">
//                 <img src="" alt="" />
//                 <input
//                   type="gender"
//                   placeholder="Gender"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <br />
//               <button onClick={prevStep}>Previous</button>
//               <button onClick={handleSubmit}>Submit</button>
//             </div>
//           </div>
//         );
//       default: return null
//     }
//   };
//   return <form>{renderForm()}</form>;
// };

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

  return <>
    {step === 0 && <PersonalDetails personalDetails={formData} onInputChange={onInputChange} />}
    {step === 1 && <ContactInfo />}
    {step === 2 && <AddressInfo />}
    <br />
    <button onClick={prevStep}>Previous</button>
    <button onClick={nextStep}>Next</button>
    <br /><br />
    <button onClick={handleSubmit}>Submit</button>
  </>

}

export default LoginSignup;

function hello(numberToreturn) {
  return numberToreturn * 2
}
hello(120)
