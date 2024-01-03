
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import {Calendar} from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';

export default function Marking({setTargetedExam,Role}) {

    let emptyMarking = {
        id: null,
        CandidateID: '',
        CandidateExamsID: '',
        ExamDate: ' ',
        MarkDate: new Date(),
        MarkerAssigned : null,
    };

    const [Markings, setMarkings] = useState(null);
    const [MarkingDialog, setMarkingDialog] = useState(false);
    const [MarkExam, setMarkExam] = useState(false);
    const [Marking, setMarking] = useState(emptyMarking);

    const toast = useRef(null);
    const dt = useRef(null);
    const [loading, setLoading] = useState(true);





    useEffect(()  =>  {

        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.mocki.io/v2/1e376031/TestToBeCorrectedMarkerExp");
                setMarkings(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Exam data:", error);
            }
        };
        fetchData();
    }, []);


    const editMarking = (Marking) => {
        setMarking({ ...Marking });
        setMarkingDialog(true);
        setTargetedExam(Marking.TestID)
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {Role==="Admin"?<Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editMarking(rowData)}/>:<Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => editMarking(rowData)}/>}
            </React.Fragment>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" ></Toolbar>

                <DataTable ref={dt} value={Markings}    loading={loading}
                           dataKey="TestID"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Markings" >

                    <Column field="TestID" header="TestID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="TestName" header="Test Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="ExamDate" header="ExamDate" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="MarkDate" header="Mark Date Due" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>






        </div>
    );
}