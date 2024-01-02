import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from "axios";
import {Calendar} from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';

export default function MarkExams() {
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const minDate = today.toLocaleDateString();
    const maxDate = oneMonthLater;


    let emptyMarking = {
        id: null,
        CandidateID: '',
        CandidateExamsID: '',
        ExamDate: ' ',
        MarkDate: new Date(minDate),
        MarkerAssigned : null,
    };

    const [Markings, setMarkings] = useState(null);
    const [MarkingDialog, setMarkingDialog] = useState(false);
    const [deleteMarkingDialog, setDeleteMarkingDialog] = useState(false);
    const [Marking, setMarking] = useState(emptyMarking);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]); // State to hold markers




    useEffect(()  =>  {

        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.mocki.io/v2/1e376031/TestsToBeCorrected");
                setMarkings(response.data);
                setLoading(false);
                const markersData = response.data.find(item => item.Markers)?.Markers;
                if (markersData) {
                    setMarkers(markersData.map(marker => ({
                        label: marker.UserName+"-"+marker.ID,
                        value: marker.ID
                    })));
                }
            } catch (error) {
                console.error("Error fetching Exam data:", error);
            }
        };
        fetchData();
    }, []);



    const hideDialog = () => {
        setSubmitted(false);
        setMarkingDialog(false);
    };

    const hideDeleteMarkingDialog = () => {
        setDeleteMarkingDialog(false);
    };

    const saveMarking = () => {
        setSubmitted(true);
        console.log(Marking);
        // do some stuff
    };

    const editMarking = (Marking) => {
        setMarking({ ...Marking });
        setMarkingDialog(true);
    };

    const confirmDeleteMarking = (Marking) => {
        setMarking(Marking);
        setDeleteMarkingDialog(true);
    };

    const deleteMarking = () => {
        let _Markings = Markings.filter((val) => val.id !== Marking.id);

        setMarkings(_Markings);
        setDeleteMarkingDialog(false);
        setMarking(emptyMarking);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Marking Deleted', life: 3000 });
    };




    const exportCSV = () => {
        dt.current.exportCSV();
    };



    const onCategoryChange = (e) => {
        let _Marking = { ...Marking };

        _Marking['category'] = e.value;
        setMarking(_Marking);
    };

    const onDateChange = (e, date) => {
        const val = (e.target && e.target.value) || '';
        let _Marking = { ...Marking };

        _Marking[`${date}`] = val;
        _Marking[`${date}`] = _Marking[`${date}`].toLocaleDateString();


        setMarking(_Marking);
    };
    const onInputChange = (e, name) => {

        const val = (e.target && e.target.value) || '';
        let _Marking = { ...Marking };
        _Marking[`${name}`] = val;
        setMarking(_Marking);
    };
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _Marking = { ...Marking };

        _Marking[`${name}`] = val;

        setMarking(_Marking);
    };



    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editMarking(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteMarking(rowData)} />
            </React.Fragment>
        );
    };




    const MarkingDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveMarking} />
        </React.Fragment>
    );
    const deleteMarkingDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteMarkingDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteMarking} />
        </React.Fragment>
    );


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" end={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={Markings}    loading={loading}
                           dataKey="TestID"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Markings" >

                    <Column field="TestID" header="TestID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="TestName" header="Test Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="ExamDate" header="ExamDate" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="MarkDate" header="Mark Date Due" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="MarkerAssigned" header="Marker Assigned" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={MarkingDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Marking Details" modal className="p-fluid" footer={MarkingDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="TestID" className="font-bold">
                        Test ID
                    </label>
                    <InputText id="TestID"  value={Marking.TestID}   disabled className={classNames({ 'p-invalid': submitted && !Marking.TestID })} />
                </div>
                <div className="field">
                    <label htmlFor="TestName" className="font-bold">
                        Test Name
                    </label>
                    <InputText id="TestName"  value={Marking.TestName}   disabled className={classNames({ 'p-invalid': submitted && !Marking.TestName })} />
                </div>
                <div className="field">
                    <label htmlFor="ExamDate" className="font-bold">
                        ExamDate
                    </label>
                    <InputText id="ExamDate"  value={Marking.ExamDate}   disabled className={classNames({ 'p-invalid': submitted && !Marking.ExamDate })} />
                </div>
                <div className="field">
                    <label htmlFor="MarkDate" className="font-bold">
                        Mark Date Due
                    </label>
                    <Calendar id="MarkDate" showIcon value={new Date(Marking.MarkDate ? Marking.MarkDate : minDate )} dateFormat="dd/mm/yy" minDate={today} maxDate={maxDate} onChange={(e) => onDateChange(e, 'MarkDate')}  className={classNames({ 'p-invalid': submitted && !Marking.MarkDate })} />
                </div>
                <div className="field">
                    <label htmlFor="MarkerAssigned" className="font-bold">
                        Marker Assigned
                    </label>
                    <Dropdown
                        value={Marking.MarkerAssigned}
                        onChange={(e) => onInputChange(e, 'MarkerAssigned')}
                        options={markers}
                        optionLabel="label"
                        placeholder="Select a Marker"
                        className="w-full md:w-14rem"
                    />
                </div>
            </Dialog>

            <Dialog visible={deleteMarkingDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteMarkingDialogFooter} onHide={hideDeleteMarkingDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Marking && (
                        <span>
                            Are you sure you want to delete <b>{Marking.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


        </div>
    );
}