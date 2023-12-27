import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

export const LoginSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    nativeLanguage: "",
    birthDate: "",
    address: "",
    addressLine2: "",
    countryofResidence: "",
    State: "",
    townCity: "",
    postalCode: "",
    landlineNumber: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", formData);
    window.alert("Form submitted successfully!");
  };

  const renderForm = () => {
    // eslint-disable-next-line default-case
    switch (step) {
      case 1:
        return (
          <div className="container">
            <div className="header">
              <div className="text">Sign Up</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  placeholder="First / Middle Name(s)"
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  placeholder="LastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </div>

              <div className="input">
                <label>Native language</label>
                <label className="edit-hide"></label>
                <div className="selectbox-wrap">
                  <select
                    value={formData.nativeLanguage}
                    className=" styled"
                    disabled=""
                    id="NativeLanguage"
                    onChange={handleChange}
                    name="nativeLanguage"
                  >
                    <option value="">Please choose...</option>
                    <option value="1">Afrikaans</option>
                    <option value="167">Akan</option>
                    <option value="2">Albanian</option>
                    <option value="135">Amazigh</option>
                    <option value="83">Amharic</option>
                    <option value="3">Arabic</option>
                    <option value="4">Armenian</option>
                    <option value="143">Assamese</option>
                    <option value="173">Assyrian</option>
                    <option value="84">Aymara</option>
                    <option value="85">Azerbaijani</option>
                    <option value="5">Azeri</option>
                    <option value="160">Bamun</option>
                    <option value="86">Bangla</option>
                    <option value="141">Baoule</option>
                    <option value="6">Basque</option>
                    <option value="7">Belarusian</option>
                    <option value="87">Bemba</option>
                    <option value="139">Bengali</option>
                    <option value="152">Bini</option>
                    <option value="88">Bislama</option>
                    <option value="71">Bosnian</option>
                    <option value="8">Bulgarian</option>
                    <option value="89">Burmese</option>
                    <option value="90">Cantonese</option>
                    <option value="9">Catalan</option>
                    <option value="91">Chamorro</option>
                    <option value="92">Chichewa</option>
                    <option value="10">Chinese</option>
                    <option value="11">Croatian</option>
                    <option value="12">Czech</option>
                    <option value="13">Danish</option>
                    <option value="93">Dari</option>
                    <option value="94">Dhivehi</option>
                    <option value="138">Dinka</option>
                    <option value="161">Diola</option>
                    <option value="14">Divehi</option>
                    <option value="15">Dutch</option>
                    <option value="95">Dzongkha</option>
                    <option value="16">English</option>
                    <option value="17">Estonian</option>
                    <option value="18">Faroese</option>
                    <option value="96">Fijian</option>
                    <option value="81">Filipino</option>
                    <option value="19">Finnish</option>
                    <option value="20">French</option>
                    <option value="97">Frisian</option>
                    <option value="166">Fulah</option>
                    <option value="21">Galician</option>
                    <option value="22">Georgian</option>
                    <option value="23">German</option>
                    <option value="172">Ghomala</option>
                    <option value="24">Greek</option>
                    <option value="98">Greenlandic</option>
                    <option value="99">Guarani</option>
                    <option value="25">Gujarati</option>
                    <option value="159">Gwere</option>
                    <option value="100">Haitian Creole</option>
                    <option value="137">Hausa</option>
                    <option value="26">Hebrew</option>
                    <option value="27">Hindi</option>
                    <option value="101">Hiri Motu</option>
                    <option value="28">Hungarian</option>
                    <option value="169">Ibibio</option>
                    <option value="29">Icelandic</option>
                    <option value="149">Igbo</option>
                    <option value="148">Ijaw</option>
                    <option value="30">Indonesian</option>
                    <option value="102">Irish</option>
                    <option value="72">isiNdebele</option>
                    <option value="73">IsiXhosa</option>
                    <option value="74">IsiZulu</option>
                    <option value="31">Italian</option>
                    <option value="32">Japanese</option>
                    <option value="33">Kannada</option>
                    <option value="34">Kazakh</option>
                    <option value="103">Khmer</option>
                    <option value="165">Kikuyu</option>
                    <option value="104">Kinyarwanda</option>
                    <option value="105">Kirundi</option>
                    <option value="35">Kiswahili</option>
                    <option value="36">Konkani</option>
                    <option value="37">Korean</option>
                    <option value="106">Krio</option>
                    <option value="170">Kuku</option>
                    <option value="107">Kurdish</option>
                    <option value="38">Kyrgyz</option>
                    <option value="108">Laotian</option>
                    <option value="109">Latin</option>
                    <option value="69">Latin Spanish</option>
                    <option value="39">Latvian</option>
                    <option value="40">Lithuanian</option>
                    <option value="156">Luganda</option>
                    <option value="110">Luxembourgish</option>
                    <option value="41">Macedonian</option>
                    <option value="154">Maithili</option>
                    <option value="111">Malagasy</option>
                    <option value="42">Malay</option>
                    <option value="136">Malayalam</option>
                    <option value="112">Maltese</option>
                    <option value="70">Mandarin</option>
                    <option value="113">Maori</option>
                    <option value="43">Marathi</option>
                    <option value="114">Marshallese</option>
                    <option value="168">Mauritian Creole</option>
                    <option value="153">Meitei</option>
                    <option value="115">Mende</option>
                    <option value="44">Mongolian</option>
                    <option value="116">Montenegrin</option>
                    <option value="117">Nauruan</option>
                    <option value="157">Navajo</option>
                    <option value="82">Nepali</option>
                    <option value="164">Nga΄ka</option>
                    <option value="80">Northern Sotho</option>
                    <option value="45">Norwegian</option>
                    <option value="155">Nyankole</option>
                    <option value="144">Odia</option>
                    <option value="151">Oriya</option>
                    <option value="119">Oromigna</option>
                    <option value="120">Palauan</option>
                    <option value="121">Papiamento</option>
                    <option value="146">Pashto</option>
                    <option value="46">Persian</option>
                    <option value="47">Polish</option>
                    <option value="48">Portuguese</option>
                    <option value="68">Portuguese (Brazil)</option>
                    <option value="49">Punjabi</option>
                    <option value="122">Quechua</option>
                    <option value="50">Romanian</option>
                    <option value="51">Russian</option>
                    <option value="123">Samoan</option>
                    <option value="52">Sanskrit</option>
                    <option value="53">Serbian</option>
                    <option value="75">Sesotho</option>
                    <option value="76">Setswana</option>
                    <option value="124">Seychellois Creole</option>
                    <option value="150">Shona</option>
                    <option value="125">Sinhala</option>
                    <option value="77">SiSwati</option>
                    <option value="54">Slovak</option>
                    <option value="55">Slovenian</option>
                    <option value="126">Somali</option>
                    <option value="56">Spanish</option>
                    <option value="57">Swedish</option>
                    <option value="58">Syriac</option>
                    <option value="59">Tamil</option>
                    <option value="60">Tatar</option>
                    <option value="61">Telugu</option>
                    <option value="127">Tetum</option>
                    <option value="62">Thai</option>
                    <option value="147">Tibetan</option>
                    <option value="128">Tigrinya</option>
                    <option value="129">Tok Pisin</option>
                    <option value="130">Tokelauan</option>
                    <option value="131">Tongan</option>
                    <option value="78">Tshivenda</option>
                    <option value="63">Turkish</option>
                    <option value="132">Turkmen</option>
                    <option value="133">Tuvaluan</option>
                    <option value="145">Twi</option>
                    <option value="64">Ukrainian</option>
                    <option value="65">Urdu</option>
                    <option value="142">URHOBO</option>
                    <option value="66">Uzbek</option>
                    <option value="67">Vietnamese</option>
                    <option value="134">Wallisian</option>
                    <option value="158">Welsh</option>
                    <option value="79">Xitsonga</option>
                    <option value="140">Yoruba</option>
                  </select>
                </div>
              </div>
              <div className="Gender">
                <img src="" alt="" />
                <h3>
                  Gender:{" "}
                  <input
                    type="radio"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />{" "}
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />{" "}
                  Other
                </h3>
              </div>
              <br />
              <button className="button-42" role="button" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="container">
            <div className="header">
              <div className="text"></div>
            </div>
            <div className="inputs">
              <div className="input">
                <img src="" alt="" />
                <input
                  type="date"
                  placeholder="Enter BirthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  name="birthDate"
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  placeholder="Native Language"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="gender"
                  placeholder="Gender"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button onClick={prevStep}>Previous</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="container">
            <div className="header">
              <div className="text"></div>
            </div>
            <div className="inputs">
              <div className="input">
                <img src="" alt="" />
                <input
                  type="date"
                  placeholder="Enter BirthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  placeholder="Native Language"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="gender"
                  placeholder="Gender"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button onClick={prevStep}>Previous</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="container">
            <div className="header">
              <div className="text"></div>
            </div>
            <div className="inputs">
              <div className="input">
                <img src="" alt="" />
                <input
                  type="date"
                  placeholder="Enter BirthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  placeholder="Native Language"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="gender"
                  placeholder="Gender"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button onClick={prevStep}>Previous</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        );
    }
  };
  return <form>{renderForm()}</form>;
};

export default LoginSignup;
