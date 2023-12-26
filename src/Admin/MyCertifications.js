import React from 'react'
import NodeJSPic from "../Pics/NodeJSPic.webp";
import AngularPic from "../Pics/AngularPic.webp";
import ReactPic from "../Pics/ReactPic.webp";

const images = {
    NodeJSPic,
    AngularPic,
    ReactPic,
};
const Certificate = ({title, image, description, ShowCertificate, CandidateID}) => {
    const selectedImage = images[image];

    return (<div className="product">
            <h3>{title}</h3>
            <img src={selectedImage} alt={title}/>
            <p>{description}</p>
            <p>{CandidateID}</p>
            <button onClick={ShowCertificate}>Show Certificate</button>
        </div>

    );
};

export default Certificate;
