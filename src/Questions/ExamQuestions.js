import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Image} from "primereact/image";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";

import AnswersTable from "./AnswersTable";

//make an obvious difference between question space and answer's

function ExamQuestions() {
    const toast = useRef(null);

    //data
    const [loading, setLoading] = useState(true);
    const [exam, setExam] = useState(null);

    const url = "https://api.mocki.io/v2/1e376031/AdminCRUDExams";

    const [expandedRows, setExpandedRows] = useState(null);

    const [imagePopup, setImagePopup] = useState('');
    const [visibleImagePopup, setVisibleImagePopup] = useState(false);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogHeader, setDialogHeader] = useState("");

    const [textInputValue, setTextInputTextInputValue] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url);
                setExam(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Certification data:", error);
            }
        };

        fetchUserData().then();
    }, []);

    //  TODO: Delete when authorization is complete
    //Testing Admin ui
    const [admin, setAdminValue] = useState(true);
    //end of testing


    const expandAll = () => {
        let _expandedRows = {};

        exam.questions.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };
    const collapseAll = () => setExpandedRows(null);

    const header = (
        <div className="flex flex-wrap justify-content-between align-items-center gap-2">
      <span>
        <h1>{exam?.testName}</h1>
      </span>
            <div>
                <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text/>
                <Button
                    icon="pi pi-minus"
                    label="Collapse All"
                    onClick={collapseAll}
                    text
                />
            </div>
        </div>
    );

    //admin delete update image end

    const rowExpansionTemplate = (question) => { //μου δίνει το row
        return (
            <div className="p-1">
                <AnswersTable answers={question.Answers} admin={admin}/>
            </div>
        );
    };

    const questionTextColumnHeader = () => {
        return (
            <div className="flex align-items-center gap-2 ">
        <span>
          <h2>Question</h2>
        </span>
                {admin && (
                    <>
                        {" "}
                        <Button
                            label="Add"
                            tooltip="Add a Question"
                            icon="pi pi-plus"
                            size="small"
                            severity="success"
                            style={{width: "90px", height: "30px"}}
                            // onClick={(e) => addRow()}
                            onClick={() => {
                                setDialogVisible(true);
                                setDialogHeader("Add new Question");
                            }}
                        />
                        <Dialog
                            header={<span> {dialogHeader}</span>}
                            visible={dialogVisible}
                            style={{width: "75vw"}}
                            contentStyle={{height: "305px"}}
                            onHide={() => setDialogVisible(false)}
                            footer={
                                <Button
                                    label="Save"
                                    tooltip="Save the Question"
                                    size="small"
                                    severity="success"
                                    style={{width: "90px", height: "30px"}}
                                    // onClick={(e) => addRow()}
                                />
                            }
                        >
                            <InputTextarea
                                value={textInputValue}
                                onChange={(e) => setTextInputTextInputValue(e.target.value)}
                                autoResize
                                style={{minWidth: "100%"}}
                                rows={12}
                            />
                        </Dialog>{" "}
                    </>
                )}
            </div>
        );
    };

    const imageColumnTemplate = (rowData) => {
        return (
            <img
                src={rowData.HasPicture}
                alt={rowData.image}
                width="64px"
                className="shadow-4"
                onClick={() => {
                    setImagePopup(rowData.HasPicture);
                    setVisibleImagePopup(true);
                }}
            />
        );
    };

    const toggleAnswer = (rowData) => {
        if (getExpandedRows().includes(rowData.id.toString())) {
            setExpandedRows(null);
            return;
        }
        const _expandedRow = {[rowData.id]: true};

        setExpandedRows(_expandedRow);
    };

    const getExpandedRows = () => {
        if (!expandedRows) {
            return [];
        }

        return Object.entries(expandedRows)
            .filter(([_, value]) => value)
            .map(([key, _]) => key);
    };
    //  TODO: refactor into single method
    const questionButtons = (rowData) => (
        <div className="flex flex-column justify-content-center align-items-center gap-1">
            <Button
                label="Answers"
                tooltip="Expand Answers"
                tooltipOptions={{position: "left"}}
                icon="pi pi-eye"
                size="small"
                severity="info"
                style={{width: "90px"}}
                onClick={() => toggleAnswer(rowData)}
            />

            <Button
                label="Update"
                tooltip="Update a Question"
                tooltipOptions={{position: "left"}}
                icon="pi pi-pencil"
                size="small"
                severity="secondary"
                style={{width: "90px"}}
                onClick={() => {
                    setDialogVisible(true);
                    setDialogHeader("Update the Question");
                    setTextInputTextInputValue("To be implemented");
                }}
            />
            <Button
                label="Delete"
                tooltip="Delete a Question"
                tooltipOptions={{position: "left"}}
                icon="pi pi-trash"
                size="small"
                severity="danger"
                style={{width: "90px"}}
            />
        </div>
    );
    const questionButtonsViewOnly = (rowData) => (
        <div className="flex flex-column justify-content-center align-items-center gap-1">
            <Button
                label=""
                tooltip="Expand Answers"
                tooltipOptions={{position: "left"}}
                icon="pi pi-eye"
                size="small"
                severity="info"
                style={{width: "35px"}}
                onClick={() => toggleAnswer(rowData)}
            />
        </div>
    );

    function questionsDatatableButtons() {
        if (admin) {
            return <Column header="Update/Remove" body={questionButtons}/>;
        }
        return <Column body={questionButtonsViewOnly}/>;
    }

    //  TODO: end of refactor into single method
    const imagePopupHeader = () => {
        return (
            <div className="flex align-items-center gap-2">
                <span>Image</span>
                {admin && (
                    <>
                        {" "}
                        <Button
                            label="Delete"
                            tooltip="Delete Image"
                            tooltipOptions={{position: "top"}}
                            icon="pi pi-trash"
                            size="small"
                            severity="danger"
                            style={{width: "90px"}}
                            onClick={(e) => alert(imagePopup)}
                        />
                        <Button
                            label="Update"
                            tooltip="Update Image"
                            tooltipOptions={{position: "top"}}
                            icon="pi pi-pencil"
                            size="small"
                            severity="secondary"
                            style={{width: "90px"}}
                            // onClick={(e) => deleteRow(rowData)}
                        />{" "}
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="card">
            <Button
                label="Admin"
                icon="pi pi-minus"
                size="large"
                severity="warning"
                onClick={() => setAdminValue(false)}
            />
            <Button
                label="Admin"
                icon="pi pi-plus"
                size="large"
                severity="warning"
                onClick={() => setAdminValue(true)}
            />
            <Toast ref={toast}/>
            {exam === null ? "" :


                <DataTable
                    loading={loading}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    value={exam.questions}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id"
                    header={header}
                    tableStyle={{minWidth: "50rem"}}
                    stripedRows={true}
                >
                    <Column
                        field="questionText"
                        header={questionTextColumnHeader}
                        className="text-lg"
                    />
                    <Column
                        header="Image"
                        body={imageColumnTemplate}
                        style={{width: "120px"}}
                    />
                    {questionsDatatableButtons()}
                </DataTable>
            }
            {/* POPUP Image element */}
            <Dialog
                header={imagePopupHeader}
                visible={visibleImagePopup}
                dismissableMask={true}
                maximizable
                style={{width: "50vw"}}
                onHide={() => {
                    setImagePopup('');
                    setVisibleImagePopup(false)
                }}
            >
                <Image src={imagePopup} alt="Image" width="100%"/>
            </Dialog>
        </div>
    );
}

export default ExamQuestions;
