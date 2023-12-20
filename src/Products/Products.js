import React from 'react';
import NodeJSPic from "../Pics/NodeJSPic.webp";
import AngularPic from "../Pics/AngularPic.webp";
import ReactPic from "../Pics/ReactPic.webp";

const images = {
    NodeJSPic,
    AngularPic,
    ReactPic,
};
const Product = ({title, image, description, price, Purchase, isPurchased}) => {
    const selectedImage = images[image];
    return (
        <div className="product">
            <h3>{title}</h3>
            <img src={selectedImage} alt={title}/>
            <p>{description}</p>
            <p>{price} €</p>
            {!isPurchased ?
                (<button onClick={Purchase}>Purchase</button>) : <button style={{backgroundColor: 'red'}}>Purchased</button> }
        </div>
    );
};

export default Product;
