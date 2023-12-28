
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import Tester from "./Tester";


export default function CertificateCRUD() {
    let emptyCertificate = {
        ID: null,
        CandidateID: null,
        FirstName: '',
        MiddleName: '',
        LastName: '',
        CandidateExamsID: null,
        PercentageScore: null,
        AssessmentTestCode: null,
        CertificationDate:new Date(),
        Title:''
    };
    const [loading, setLoading] = useState(true);
    const [Certificates, setCertificates] = useState(null);
    const [CertificateDialog, setCertificateDialog] = useState(false);
    const [deleteCertificateDialog, setDeleteCertificateDialog] = useState(false);
    const [Certificate, setCertificate] = useState(emptyCertificate);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const url="https://api.mocki.io/v2/1e376031/AdminCRUDCertificates";
    const [PreviewCertificateDialog, setPreviewCertificateDialog] = useState(false);
    const [CertificatePrintData, setCertificatePrintData] = useState({ Name: '', Date: '', Course: '', id: ''});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url);
                setCertificates(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Certification data:', error);
            }
        };

        fetchUserData();
    }, []);

    const openNew = () => {
        setCertificate(emptyCertificate);
        setSubmitted(false);
        setCertificateDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCertificateDialog(false);
    };

    const hideDeleteCertificateDialog = () => {
        setDeleteCertificateDialog(false);
    };


    const saveCertificate = () => {
        setSubmitted(true);

        if (Certificate.name.trim()) {
            let _Certificates = [...Certificates];
            let _Certificate = { ...Certificate };

            if (Certificate.id) {
                const index = findIndexById(Certificate.id);

                _Certificates[index] = _Certificate;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Certificate Updated', life: 3000 });
            } else {
                _Certificate.id = createId();
                _Certificate.image = 'Certificate-placeholder.svg';
                _Certificates.push(_Certificate);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Certificate Created', life: 3000 });
            }

            setCertificates(_Certificates);
            setCertificateDialog(false);
            setCertificate(emptyCertificate);
        }
    };

    const editCertificate = (Certificate) => {
        setCertificate({ ...Certificate });
        setCertificateDialog(true);
    };

    const confirmDeleteCertificate = (Certificate) => {
        setCertificate(Certificate);
        setDeleteCertificateDialog(true);
    };

    const deleteCertificate = () => {
        let _Certificates = Certificates.filter((val) => val.id !== Certificate.id);

        setCertificates(_Certificates);
        setDeleteCertificateDialog(false);
        setCertificate(emptyCertificate);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Certificate Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < Certificates.length; i++) {
            if (Certificates[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const onCategoryChange = (e) => {
        let _Certificate = { ...Certificate };

        _Certificate['AssesmentResultLabel'] = e.value;
        setCertificate(_Certificate);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Certificate = { ...Certificate };

        _Certificate[`${name}`] = val;

        setCertificate(_Certificate);
    };



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };



    function DownloadCertificate(rowData) {
        let Name=rowData.FirstName+" "+rowData.MiddleName+" "+rowData.LastName;
        let Date=rowData.CertificationDate;
        let Course=rowData.Title;
        let id=rowData.ID;
        setCertificatePrintData({ Name, Date, Course, id });
        setPreviewCertificateDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCertificate(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCertificate(rowData)} />
                <Button icon="pi-download" rounded outlined severity="mr-2" onClick={() => DownloadCertificate(rowData)} />
            </React.Fragment>
        );
    };
    const PreviewCertificateDialogFooter  = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        </React.Fragment>
    );
    const CertificateDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCertificate} />
        </React.Fragment>
    );
    const deleteCertificateDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCertificateDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCertificate} />
        </React.Fragment>
    );


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={Certificates}
                           loading={loading}
                           dataKey="ID"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Certificates" >
                    <Column key="ID" field="ID" header="ID" sortable />
                    <Column key="CandidateID" field="CandidateID" header="CandidateID" sortable style={{ minWidth: '1rem' }}/>
                    <Column key="CertificationDate" field="CertificationDate" header="Date" sortable />
                    <Column key="Title" field="Title" header="Title" sortable />
                    <Column key="FirstName" field="FirstName" header="First Name" sortable />

                    <Column key="MiddleName" field="MiddleName" header="MiddleName" sortable />
                    <Column key="LastName" field="LastName" header="LastName" sortable />
                    <Column field="CandidateExamsID" header="CandidateExamsID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column key="AssessmentTestCode" field="AssessmentTestCode" header="AssessmentTestCode" sortable />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={CertificateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Certificate Details" modal className="p-fluid" footer={CertificateDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="CandidateID" className="font-bold">
                        CandidateID
                    </label>
                    <InputText id="CandidateID" value={Certificate.CandidateID} onChange={(e) => onInputChange(e, 'CandidateID')} required autoFocus className={classNames({ 'p-invalid': submitted && !Certificate.CandidateID })} />
                    {submitted && !Certificate.FirstName && <small className="p-error">FirstName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="FirstName" className="font-bold">
                        FirstName
                    </label>
                    <InputText id="FirstName" value={Certificate.FirstName} onChange={(e) => onInputChange(e, 'FirstName')} required  className={classNames({ 'p-invalid': submitted && !Certificate.FirstName })} />
                    {submitted && !Certificate.FirstName && <small className="p-error">FirstName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="MiddleName" className="font-bold">
                        MiddleName
                    </label>
                    <InputText id="MiddleName" value={Certificate.MiddleName} onChange={(e) => onInputChange(e, 'MiddleName')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="LastName" className="font-bold">
                        LastName
                    </label>
                    <InputText id="LastName" value={Certificate.LastName} onChange={(e) => onInputChange(e, 'LastName')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="CandidateExamsID" className="font-bold">
                        CandidateExamsID
                    </label>
                    <InputText id="CandidateExamsID" value={Certificate.CandidateExamsID} onChange={(e) => onInputChange(e, 'CandidateExamsID')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="AssessmentTestCode" className="font-bold">
                        AssessmentTestCode
                    </label>
                    <InputText id="AssessmentTestCode" value={Certificate.AssessmentTestCode} onChange={(e) => onInputChange(e, 'AssessmentTestCode')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Assessment Result</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="Pass" name="AssesmentResultLabel" value="Pass" onChange={onCategoryChange} checked={Certificate.AssesmentResultLabel === "Pass"} />
                            <label htmlFor="Pass">Pass</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="Fail" name="AssesmentResultLabel" value="Fail" onChange={onCategoryChange} checked={Certificate.AssesmentResultLabel ==="Fail"} />
                            <label htmlFor="Fail">Fail</label>
                        </div>
                    </div>
                </div>


            </Dialog>

            <Dialog visible={deleteCertificateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCertificateDialogFooter} onHide={hideDeleteCertificateDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Certificate && (
                        <span>
                            Are you sure you want to delete <b>{Certificate.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            <Dialog visible={PreviewCertificateDialog}  header="Preview Certificate" modal className="p-fluid" footer={PreviewCertificateDialogFooter} onHide={()=> setPreviewCertificateDialog(false)}>
                <Tester id={CertificatePrintData.id} date={CertificatePrintData.Date} name={CertificatePrintData.Name} course={CertificatePrintData.Course}/>

            </Dialog>

        </div>
    );
}
