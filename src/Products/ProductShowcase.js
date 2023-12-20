import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Products';
import './ProductShowcase.css';

import PaymentForm from "./Popup";

const ProductShowcase = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [productData, setProductData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://api.mocki.io/v2/1e376031/ProductsEshop');
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const purchaseHandler = (product) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const handlePurchaseSubmit = () => {
        setShowPopup(false);
        alert('Purchase successful!')
    };

    return (
        <div className="product-showcase">
            <h2>Featured Products</h2>
            <div className="products">
                {productData.map((product) => (
                    <div key={product.ExamID}>
                        <Product
                            key={product.ExamID}
                            title={product.Title}
                            image={product.Image}
                            description={product.Description}
                            price={product.Price}
                            Purchase={() => purchaseHandler(product)}
                            isPurchased={product.IsPurchased}
                        />
                    </div>
                ))}
            </div>

            {showPopup && (
                    <div className="popup">
                    <span className="close" onClick={() => setShowPopup(false)}>
                        &times;
                    </span>
                        <PaymentForm TheProduct={selectedProduct} handlePurchaseSubmit={handlePurchaseSubmit} />

                    </div>

            )}
        </div>
    );
};

export default ProductShowcase;
