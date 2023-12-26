import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Certificate from "./MyCertifications";
import Modal from "react-modal";

const Popup = ({CertificateKey, onClose, onUpdate, onDelete}) => {
    const popupRef = useRef(null);

    const handleUpdate = () => {
        onUpdate(CertificateKey);
        onClose(); // Close the popup after update
    };
    const handleDelete = () => {
        onDelete(CertificateKey.id); // Pass CertificateKey ID to the parent component for deletion
    };
    const handleDownload = () => {
        console.log('Downloading file...');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="popup-overlay">
            <div ref={popupRef} className="popup-inner">
                <h1>Hello, this is the Certificate:</h1>
                <div>
                    <p>Title: {CertificateKey.title}</p>
                    <p>Description: {CertificateKey.description}</p>
                    <p>Score : {CertificateKey.Score}%</p>
                </div>
                <button onClick={handleDownload}>Download File</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};
const CertificateCRUD = () => {


    const [CertificatePopup, setCertificatePopup] = useState(false);
    const [CertificateKey, setCertificateKey] = useState({});
    const [productData, setProductData] = useState([])
    const [editingCertificate, setEditingCertificate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ...

    const handleUpdate = (certificate) => {
        setEditingCertificate(certificate);
        setIsModalOpen(true);
    };

    const handleInputChange = (event) => {
        setEditingCertificate({...editingCertificate, [event.target.name]: event.target.value});
    };

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            // Send a request to the server to update the certificate
            // Replace the URL with your API endpoint
            await axios.put(`https://your-api-endpoint/certificates/${editingCertificate.id}`, editingCertificate);

            // Update the certificate list
            setProductData(productData.map(certificate => certificate.id === editingCertificate.id ? editingCertificate : certificate));

            // Clear the editing certificate and close the modal
            setEditingCertificate(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating certificate:", error);
        }
    };



    const handleDelete = async (certificateId) => {
        try {
            // Perform deletion API call

            // Remove the deleted certificate from the state or refetch data from the server
            // Update productData state or fetch updated data to reflect the changes
            console.log("Deleted certificate with ID:", certificateId);
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://mocki.io/v1/c7451e50-416f-4cda-9e79-dd77f071d4d3");
                setProductData(response.data);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const ShowCertificate = (product) => {
        setCertificatePopup(true);
        setCertificateKey(product);
    };

    const handleClose = () => {
        setCertificatePopup(false);
        setCertificateKey({});
    };

    return (
        <div className="product-showcase">
            <h2>Certificates </h2>
            <div className="products">
                {productData.map((product) => (
                    (product.isPurchased && (product.Score)) && (
                        <div key={product.id}>
                            <Certificate
                                key={product.id}
                                title={product.title}
                                image={product.image}
                                description={product.description}
                                CandidateID={product.CandidateID}
                                ShowCertificate={() => ShowCertificate(product)}

                            />

                        </div>)
                ))}
            </div>
            {CertificatePopup && (
                <Popup CertificateKey={CertificateKey}
                       onClose={handleClose}
                       onUpdate={handleUpdate}
                       onDelete={handleDelete}
                />
            )}{isModalOpen && (
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{
                content: {
                    width: '200px', // Adjust width as needed
                    height: '150px', // Adjust height as needed
                    margin: 'auto', // Centers the modal
                }
            }}
            >
                {editingCertificate && (
                    <form onSubmit={handleSave} style={{display: 'flex', flexDirection: 'column'}}>
                        <input name="title" value={editingCertificate.title} onChange={handleInputChange}/>
                        <input name="description" value={editingCertificate.description} onChange={handleInputChange}/>
                        <input name="Score" value={editingCertificate.Score} onChange={handleInputChange}/>
                        <button type="submit">Save</button>
                    </form>
                )}
            </Modal>
        )}
        </div>
    );
};

export default CertificateCRUD;