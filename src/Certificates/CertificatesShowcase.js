import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../Products/ProductShowcase.css';
import 'primereact/resources/themes/nova/theme.css';
import { Button } from 'primereact/button';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import Tester from "../Admin/Tester";
import {Dialog} from "primereact/dialog";

// URLs for Certificate images


// Component responsible for showcasing Certificates

const CertificatesShowcase = () => {
    // State variables
    const toast = useRef(null); // Reference for toast messages
    const [CertificateData, setCertificateData] = useState([]); // State for Certificate data
    const [PreviewCertificateDialog, setPreviewCertificateDialog] = useState(false);
    const [CertificatePrintData, setCertificatePrintData]  =useState({ Name: '', Date: '', Course: '', id: 1});
    const hideDialogPreview = () => {
        setPreviewCertificateDialog(false);
    };
    const PreviewCertificateDialogFooter  = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialogPreview} />
        </React.Fragment>
    );


    const CertificateTemplate = ({id,title,image,CertificationDate,PercentageScore,Name}) => {
        function DownloadCertificate(rowData) {
            setPreviewCertificateDialog(true);
            setCertificatePrintData({Date: CertificationDate, ID: id, Name: Name, Title: title});
        }
        const header = (<img alt="Card" src={image} />); // Header for the Certificate card
        const footer = (
          <Button className="Rounded" onClick={() => DownloadCertificate()} label="Download" severity="secondary"></Button>
        );

        // Return the card component displaying Certificate details
        return (
            <>
                <Card title={title} footer={footer} header={header} className="TxtAlCntr">
                    <p className="m-0">Date : {CertificationDate}</p>
                    <p className="m-0">Score : {PercentageScore}%</p>
                </Card>
            </>
        );
    };


    // Fetch Certificate data from an API on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://api.mocki.io/v2/1e376031/Certificates');
                setCertificateData(response.data); // Set the fetched Certificate data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);



    // Render the Certificate showcase
    return (
        <>
            <Toast ref={toast} /> {/* Toast component for displaying messages */}

            <div className="product-showcase BackgroundColor">
                <h2>Certificates Acquired</h2>
                <div className="products">
                    {/* Map through Certificate data to render individual Certificate components */}
                    {CertificateData.map((Certificate) => (
                        <div key={Certificate.ID}>
                            <CertificateTemplate
                                id={Certificate.ID}
                                title={Certificate.Title}
                                image={Certificate.Image}
                                CertificationDate={Certificate.CertificationDate}
                                PercentageScore={Certificate.PercentageScore}
                                Name={Certificate.FirstName + " " + Certificate.MiddleName[0] + ".  " + Certificate.LastName}
                            />
                        </div>
                    ))}
                </div>

                {/* Render payment form popup if showPopup is true */}
                <Dialog visible={PreviewCertificateDialog}  header="Preview Certificate" modal className="p-fluid" footer={PreviewCertificateDialogFooter} onHide={()=> setPreviewCertificateDialog(false)}>
                    <Tester id={CertificatePrintData.ID} date={CertificatePrintData.Date} name={CertificatePrintData.Name} course={CertificatePrintData.Title}/>

                </Dialog>
            </div>
        </>
    );
};

export default CertificatesShowcase;
