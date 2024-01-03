import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./ProductShowcase.css";
import PaymentForm from "./Popup";
import "primereact/resources/themes/nova/theme.css";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

// Component responsible for showcasing products
const ProductShowcase = ({Role}) => {
    // State variables
    const [showPopup, setShowPopup] = useState(false); // Toggle the Payment Form popup
    const toast = useRef(null); // Reference for toast messages
    const [productData, setProductData] = useState([]); // State for product data
    const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
    const admin = false;

    // Individual product component
    const Product = ({
                         title,
                         image,
                         description,
                         price,
                         Purchase,
                         isPurchased,
                     }) => {
        const header = <img alt="Card" src={image} />; // Header for the product card
        const footer = (
            <>
                {!(Role==="Admin") ? (
                        (!isPurchased ? (
                            <Button
                                className="Rounded"
                                onClick={Purchase}
                                label="Purchase"
                                severity="success"
                            ></Button>
                        ) : (
                            <Button
                                className="Rounded"
                                label="Purchased"
                                severity="danger"
                                disabled
                            ></Button>
                        ))):
                    <div className="flex justify-content-around">
                        <Button
                            className="Rounded"
                            label="update"
                            severity="secondary"
                            icon="pi pi-pencil"
                        ></Button>
                        <Button
                            className="Rounded"
                            label="delete"
                            severity="danger"
                            icon="pi pi-trash"
                        ></Button>
                    </div>
                }
            </>
        );


        // Return the card component displaying product details
        return (
            <>
                <Card
                    title={title}
                    footer={footer}
                    header={header}
                    className="TxtAlCntr"
                >
                    <p className="m-0">{description}</p>
                    <h5 className="m-0">Price: ${price}</h5>
                </Card>
            </>
        );
    };


    function createNewExam(){
        //TODO: Add a textbox and a save button that sends data
        console.log("New Exam")
    }

    // Fetch product data from an API on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "https://api.mocki.io/v2/1e376031/ProductsEshop"
                );
                setProductData(response.data); // Set the fetched product data in state
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Handler for purchasing a product
    const purchaseHandler = (product) => {
        setSelectedProduct(product); // Set the selected product in state
        setShowPopup(true); // Show the payment form popup
    };

    // Handler for submitting a purchase
    const handlePurchaseSubmit = () => {
        setShowPopup(false); // Close the payment form popup
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Purchase successful",
            life: 3000,
        }); // Show a success toast message
    };

    // Render the product showcase
    return (
        <>
            <Toast ref={toast} /> {/* Toast component for displaying messages */}
            <div className="product-showcase BackgroundColor">
                <h2>Featured Products</h2>
                <div className="products">
                    {/* Map through product data to render individual Product components */}
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
                    { admin  && (
                        <>
                            <Card className="flex align-items-center justify-content-center ">
                                <Button
                                    label="Add New Exam"
                                    severity="success"
                                    icon="pi pi-plus"
                                    tooltip="Add New Exam"
                                    tooltipOptions={{ position: "bottom" }}
                                    onClick={()=> createNewExam()}
                                ></Button>
                            </Card>
                        </>
                    )}
                </div>

                {/* Render payment form popup if showPopup is true */}
                {showPopup && (
                    <div className="popup">
            <span
                className="close Bckgrnd-Clr"
                onClick={() => setShowPopup(false)}
            >
              &times;
            </span>
                        {/* Pass selected product and submit handler to PaymentForm component */}
                        <PaymentForm
                            TheProduct={selectedProduct}
                            handlePurchaseSubmit={handlePurchaseSubmit}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductShowcase;