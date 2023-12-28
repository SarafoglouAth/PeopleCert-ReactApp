import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './ProductShowcase.css';
import PaymentForm from "./Popup";
import 'primereact/resources/themes/nova/theme.css';
import {Button} from 'primereact/button';
import {Carousel} from 'primereact/carousel';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import NodeJSPic from "../Pics/NodeJSPic.webp";
import AngularPic from "../Pics/AngularPic.webp";
import ReactPic from "../Pics/ReactPic.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";
import LandingPage from "../Pics/LandingPage.jpg";


const images = {
    NodeJSPic,
    AngularPic,
    ReactPic,
};
const ProductShowcase = () => {
    const [showPopup, setShowPopup] = useState(false);
    const toast = useRef(null);
    const [productData, setProductData] = useState([]);
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const Product = ({title, image, description, price, Purchase, isPurchased}) => {
        const selectedImage = images[image];
        const header = (<img alt="Card" src={selectedImage}/>);
        const footer = (
            <>
                {!isPurchased
                    ?
                    (<Button className="Rounded" onClick={Purchase} label="Purchase" severity="success"></Button>)
                    :
                    <Button className="Rounded" label="Purchased" severity="danger" disabled></Button>
                }
            </>
        );

        return (<>
                <Card title={title} footer={footer} header={header} className="TxtAlCntr">
                    <p className="m-0">{description}</p>
                    <h5 className="m-0">Price: ${price}</h5>
                </Card></>
        );
    };

    const productTemplate = (product) => {
        const selectedImage = images[product.Image];
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 ">
                <div className="mb-3">
                    <img src={selectedImage} alt={product.Title} className="w-6 shadow-2"/>
                </div>
                <div>
                    <h4 className="mb-1">{product.Title}</h4>
                    <h6 className="mt-0 mb-3">${product.Price}</h6>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://api.mocki.io/v2/1e376031/ProductsEshop');
                setProductData(response.data);
                setProducts(response.data);
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
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Purchase successful', life: 3000});

    };





    return (<>
            <Toast ref={toast}/>

            <div className="product-showcase BackgroundColor">
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
                    <span className="close Bckgrnd-Clr" onClick={() => setShowPopup(false)}>
                        &times;
                    </span>
                        <PaymentForm TheProduct={selectedProduct} handlePurchaseSubmit={handlePurchaseSubmit}/>

                    </div>

                )}
            </div>
        </>
    );
};

export default ProductShowcase;
