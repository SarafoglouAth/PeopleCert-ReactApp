import Product from './Products';
import NodeJSPic from "../Pics/NodeJSPic.webp"
import AngularPic from "../Pics/AngularPic.webp"
import ReactPic from "../Pics/ReactPic.webp"
import "./ProductShowcase.css"
import React, {useEffect, useState} from 'react';
import axios from "axios";


const ProductShowcase = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [productData, setProductData] = useState([]);
    const [pass, setPass] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://api.mocki.io/v2/1e376031/ProductsEshop");
                setProductData(response.data);
                console.log(typeof response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);


    const purchaseHandler = () => {
        return null;
    }


    return (
        <div className="product-showcase">
            <h2>Featured Products</h2>
            <div className="products">
                {pass && productData.map((product) => (
                    <div key={product.ExamID}>
                        <Product
                            key={product.ExamID}
                            title={product.Title}
                            image={product.Image}
                            description={product.Description}
                            price={product.Price}
                            Purchase={purchaseHandler()}
                            isPurchased={((product.ExamPurchaseDate && product.ExamDate )&& (product.IsSuccess === false || product.IsSuccess == null ))}
                        /></div>
                ))}
            </div>
        </div>
    );
};

export default ProductShowcase;



