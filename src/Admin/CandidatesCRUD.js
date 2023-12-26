import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import {RadioButton} from "primereact/radiobutton";
import {Calendar} from "primereact/calendar";
import {Password} from "primereact/password";


export default function CandidatesDemo() {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Calculate years for min and max dates
    const minYear = currentYear - 101;
    const maxYear = currentYear - 10;



    // Set minimum and maximum dates
    const minDate = new Date();
    minDate.setFullYear(minYear);

    const maxDate = new Date();
    maxDate.setFullYear(maxYear);

    let emptyCandidate = {
        UserID: null,
        UserName: '',
        Password: '',
        CandidateID:null,
        FirstName:'',
        MiddleName: '',
        LastName: '',
        Gender: '',
        NativeLanguage: '',
        BirthDate: new Date(maxDate),
        PhotoIDType: '',
        PhotoIDNumber: '',
        PhotoIDIssueDate: '',
        Email: '',
        Address: '',
        AddressLine2: '',
        CountryOfResidence: '',
        State: '',
        Territory: '',
        Province: '',
        TownCity: '',
        PostalCode: '',
        LandlineNumber: '',
        MobileNumber: '',
    };
    const [loading, setLoading] = useState(true);
    const [Candidates, setCandidates] = useState([]);
    const [CandidateDialog, setCandidateDialog] = useState(false);
    const [deleteCandidateDialog, setDeleteCandidateDialog] = useState(false);
    const [Candidate, setCandidate] = useState(emptyCandidate);
    const [selectedCandidates, setSelectedCandidates] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const response = await axios.get('https://api.mocki.io/v2/1e376031/AdminCRUDCandidates');
                setCandidates(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Candidate data:', error);
            }
        };

        fetchCandidateData();
    }, []);
    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < Candidates.length; i++) {
            if (Candidates[i].id === id) {
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
    const saveCandidate = () => {
        setSubmitted(true);

        if (Candidate.name.trim()) {
            let _Candidates = [...Candidates];
            let _Candidate = { ...Candidate };

            if (Candidate.id) {
                const index = findIndexById(Candidate.id);

                _Candidates[index] = _Candidate;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Candidate Updated', life: 3000 });
            } else {
                _Candidate.id = createId();
                _Candidate.image = 'Candidate-placeholder.svg';
                _Candidates.push(_Candidate);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Candidate Created', life: 3000 });
            }

            setCandidates(_Candidates);
            setCandidateDialog(false);
            setCandidate(emptyCandidate);
        }
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };
    const openNew = () => {
        setCandidate(emptyCandidate);
        setSubmitted(false);
        setCandidateDialog(true);
    };
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Candidate = { ...Candidate };

        _Candidate[`${name}`] = val;

        setCandidate(_Candidate);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setCandidateDialog(false);
    };
    const hideDeleteCandidateDialog = () => {
        setDeleteCandidateDialog(false);
    };




    const deleteCandidate = () => {
        let _Candidates = Candidates.filter((val) => val.id !== Candidate.id);

        setCandidates(_Candidates);
        setDeleteCandidateDialog(false);
        setCandidate(emptyCandidate);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };
    const onCategoryChange = (e) => {
        let _Candidate = { ...Candidate };

        _Candidate['PhotoIDType'] = e.value;
        setCandidate(_Candidate);
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

    const CandidateDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => setCandidateDialog(false)} />
            <Button label="Save" icon="pi pi-check" onClick={saveCandidate} />
        </React.Fragment>
    );

    const deleteCandidateDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCandidateDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCandidate} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCandidate(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCandidate(rowData)} />
            </React.Fragment>
        );
    };
    const editCandidate = (Candidate) => {
        setCandidate({ ...Candidate });
        setCandidateDialog(true);
    };
    const confirmDeleteCandidate = (Candidate) => {
        setCandidate(Candidate);
        setDeleteCandidateDialog(true);
    }


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={Candidates}
                    selection={selectedCandidates}
                    onSelectionChange={(e) => setSelectedCandidates(e.value)}
                    dataKey="CandidateID"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Candidates"
                    loading={loading}
                >
                    <Column key="UserID" field="UserID" header="UserID" sortable style={{ minWidth: '1rem' }}/>
                    <Column key="CandidateID" field="CandidateID" header="CandidateID" sortable style={{ minWidth: '1rem' }}/>
                    <Column key="UserName" field="UserName" header="UserName" sortable />
                    <Column key="FirstName" field="FirstName" header="First Name" sortable />
                    <Column key="MiddleName" field="MiddleName" header="MiddleName" sortable />
                    <Column key="LastName" field="LastName" header="LastName" sortable />
                    <Column key="Gender" field="Gender" header="Gender" sortable />
                    <Column key="NativeLanguage" field="NativeLanguage" header="NativeLanguage" sortable />
                    <Column key="BirthDate" field="BirthDate" header="BirthDate"  sortable />
                    <Column key="PhotoIDType" field="PhotoIDType" header="PhotoIDType" sortable />
                    <Column key="PhotoIDNumber" field="PhotoIDNumber" header="PhotoIDNumber" sortable />
                    <Column key="PhotoIDIssueDate" field="PhotoIDIssueDate" header="PhotoIDIssueDate" sortable />
                    <Column key="Email" field="Email" header="Email" sortable />
                    <Column key="Address" field="Address" header="Address" sortable />
                    <Column key="AddressLine2" field="AddressLine2" header="AddressLine2" sortable />
                    <Column key="CountryOfResidence" field="CountryOfResidence" header="CountryOfResidence" sortable />
                    <Column key="State" field="State" header="State" sortable />
                    <Column key="Territory" field="Territory" header="Territory" sortable />
                    <Column key="Province" field="Province" header="Province" sortable />
                    <Column key="TownCity" field="TownCity" header="TownCity" sortable />
                    <Column key="PostalCode" field="PostalCode" header="PostalCode" sortable />
                    <Column key="LandlineNumber" field="LandlineNumber" header="LandlineNumber" sortable />
                    <Column key="MobileNumber" field="MobileNumber" header="MobileNumber" sortable />
                    <Column key="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>

            <Dialog  visible={CandidateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Candidate Details" modal className="p-fluid" footer={CandidateDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="UserName" className="font-bold">
                        UserName
                    </label>
                    <InputText id="UserName"  value={Candidate.UserName} onChange={(e) => onInputChange(e, 'UserName')} required autoFocus className={classNames({ 'p-invalid': submitted && !Candidate.UserName })} />
                    {submitted && !Candidate.UserName && <small className="p-error">UserName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Password" className="font-bold">
                        Password
                    </label>
                    <Password  toggleMask id="Password" value={Candidate.Password} onChange={(e) => onInputChange(e, 'Password')} required  className={classNames({ 'p-invalid': submitted && !Candidate.Password })} />
                    {submitted && !Candidate.Password && <small className="p-error">Password is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="FirstName" className="font-bold">
                        Firstname
                    </label>
                    <InputText id="FirstName" value={Candidate.FirstName} onChange={(e) => onInputChange(e, 'FirstName')} required rows={3} cols={20} autoFocus className={classNames({ 'p-invalid': submitted && !Candidate.FirstName })} />
                    {submitted && !Candidate.FirstName && <small className="p-error">Firstname is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="MiddleName" className="font-bold">
                        MiddleName
                    </label>
                    <InputText id="MiddleName" value={Candidate.MiddleName} onChange={(e) => onInputChange(e, 'MiddleName')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.MiddleName })} />
                    {submitted && !Candidate.MiddleName && <small className="p-error">MiddleName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="LastName" className="font-bold">
                        Lastname
                    </label>
                    <InputText id="LastName" value={Candidate.LastName} onChange={(e) => onInputChange(e, 'LastName')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.LastName })} />
                    {submitted && !Candidate.LastName && <small className="p-error">Lastname is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Gender" className="font-bold">
                        Gender
                    </label>
                    <InputText id="Gender" value={Candidate.Gender} onChange={(e) => onInputChange(e, 'Gender')} required rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.Gender })} />
                    {submitted && !Candidate.Gender && <small className="p-error">Gender is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="NativeLanguage" className="font-bold">
                        NativeLanguage
                    </label>
                    <InputText id="NativeLanguage" value={Candidate.NativeLanguage} onChange={(e) => onInputChange(e, 'NativeLanguage')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.NativeLanguage })} />
                    {submitted && !Candidate.NativeLanguage && <small className="p-error">NativeLanguage is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="BirthDate" className="font-bold">
                        BirthDate
                    </label>
                    <Calendar  id="BirthDate" value={new Date(Candidate.BirthDate)} onChange={(e) => onInputChange(e, 'BirthDate')} required   dateFormat="dd/mm/yy"  showIcon   readOnlyInput  className={classNames({ 'p-invalid': submitted && !Candidate.BirthDate })} />
                    {submitted && !Candidate.BirthDate && <small className="p-error">BirthDate is required.</small>}
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Photo ID Type</label>
                        <div className="flex align-items-center">
                        <div className="field-radiobutton col-6 ">
                            <RadioButton inputId="photoID1" name="PhotoIDType" value="Passport" onChange={onCategoryChange} checked={Candidate.PhotoIDType === "Passport"} />
                            <label htmlFor="photoID1">Passport</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="photoID2" name="PhotoIDType" value="CountryIDCard" onChange={onCategoryChange} checked={Candidate.PhotoIDType === "CountryIDCard"} />
                            <label htmlFor="photoID2">Country ID Card</label>
                        </div>

                    </div>
                </div>

                <div className="field">
                    <label htmlFor="PhotoIDNumber" className="font-bold">
                        PhotoIDNumber
                    </label>
                    <InputText id="PhotoIDNumber" value={Candidate.PhotoIDNumber} onChange={(e) => onInputChange(e, 'PhotoIDNumber')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.PhotoIDNumber })} />
                    {submitted && !Candidate.PhotoIDNumber && <small className="p-error">PhotoIDNumber is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="PhotoIDIssueDate" className="font-bold">
                        PhotoIDIssueDate
                    </label>
                    <InputText id="PhotoIDIssueDate" value={Candidate.PhotoIDIssueDate} onChange={(e) => onInputChange(e, 'PhotoIDIssueDate')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.PhotoIDIssueDate })} />
                    {submitted && !Candidate.PhotoIDIssueDate && <small className="p-error">PhotoIDIssueDate is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Email" className="font-bold">
                        Email
                    </label>
                    <InputText id="Email" value={Candidate.Email} onChange={(e) => onInputChange(e, 'Email')} required    className={classNames({ 'p-invalid': submitted && !Candidate.Email })} />
                    {submitted && !Candidate.Email && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Address" className="font-bold">
                        Address
                    </label>
                    <InputText id="Address" value={Candidate.Address} onChange={(e) => onInputChange(e, 'Address')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.Address })} />
                    {submitted && !Candidate.Address && <small className="p-error">Address is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="AddressLine2" className="font-bold">
                        AddressLine2
                    </label>
                    <InputText id="AddressLine2" value={Candidate.AddressLine2} onChange={(e) => onInputChange(e, 'AddressLine2')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.AddressLine2 })} />
                    {submitted && !Candidate.AddressLine2 && <small className="p-error">AddressLine2 is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="CountryOfResidence" className="font-bold">
                        CountryOfResidence
                    </label>
                    <InputText id="CountryOfResidence" value={Candidate.CountryOfResidence} onChange={(e) => onInputChange(e, 'CountryOfResidence')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.CountryOfResidence })} />
                    {submitted && !Candidate.CountryOfResidence && <small className="p-error">CountryOfResidence is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="State" className="font-bold">
                        State
                    </label>
                    <InputText id="State" value={Candidate.State} onChange={(e) => onInputChange(e, 'State')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.State })} />
                    {submitted && !Candidate.State && <small className="p-error">State is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Territory" className="font-bold">
                        Territory
                    </label>
                    <InputText id="Territory" value={Candidate.Territory} onChange={(e) => onInputChange(e, 'Territory')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.Territory })} />
                    {submitted && !Candidate.Territory && <small className="p-error">Territory is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Province" className="font-bold">
                        Province
                    </label>
                    <InputText id="Province" value={Candidate.Province} onChange={(e) => onInputChange(e, 'Province')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.Province })} />
                    {submitted && !Candidate.Province && <small className="p-error">Province is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="TownCity" className="font-bold">
                        TownCity
                    </label>
                    <InputText id="TownCity" value={Candidate.TownCity} onChange={(e) => onInputChange(e, 'TownCity')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.TownCity })} />
                    {submitted && !Candidate.TownCity && <small className="p-error">TownCity is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="PostalCode" className="font-bold">
                        PostalCode
                    </label>
                    <InputText id="PostalCode" value={Candidate.PostalCode} onChange={(e) => onInputChange(e, 'PostalCode')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.PostalCode })} />
                    {submitted && !Candidate.PostalCode && <small className="p-error">PostalCode is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="LandlineNumber" className="font-bold">
                        LandlineNumber
                    </label>
                    <InputText id="LandlineNumber" value={Candidate.LandlineNumber} onChange={(e) => onInputChange(e, 'LandlineNumber')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.LandlineNumber })} />
                    {submitted && !Candidate.LandlineNumber && <small className="p-error">LandlineNumber is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="MobileNumber" className="font-bold">
                        MobileNumber
                    </label>
                    <InputText id="MobileNumber" value={Candidate.MobileNumber} onChange={(e) => onInputChange(e, 'MobileNumber')} required  rows={3} cols={20}  className={classNames({ 'p-invalid': submitted && !Candidate.MobileNumber })} />
                    {submitted && !Candidate.MobileNumber && <small className="p-error">MobileNumber is required.</small>}
                </div>
            </Dialog>
            <Dialog visible={deleteCandidateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCandidateDialogFooter} onHide={hideDeleteCandidateDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Candidate && (
                        <span>
                            Are you sure you want to delete <b>{Candidate.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


        </div>
    );
}