import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import {ConfirmDialog} from 'primereact/confirmdialog';
import {confirmDialog} from 'primereact/confirmdialog';

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

    // const [questionEditorVisible, setQuestionEditorVisible] = useState(false);
    // const [questionEditorHeader, setQuestionEditorHeader] = useState("");
    const [questionEditor, setQuestionEditor] = useState({
        visible: false,
        header: '',
        value: '',
        isAdd: false,
        questionId: null
    });


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

    function showQuestionEditor(isAdd, value, questionId) {
        setQuestionEditor(
            {
                ...questionEditor,
                visible: true,
                isAdd: isAdd,
                header: isAdd ? "Add new Question" : "Update Question",
                value: value ?? '',
                questionId: questionId
            }
        );
    }

    const upsertQuestion = () => {
        //TODO: implement
        console.log(`Question Update not implemented yet, would update questionId: ${questionEditor}`, questionEditor);
        if (questionEditor.isAdd) {
            axios.post('https://backend.yes/AddQuestion', {
                examId: 'TODO: examId',
                questionText: questionEditor.value
            })
                .then(successResponse => console.log(successResponse))
                .catch(errorResponse => console.error(errorResponse));
        } else {
            axios.put(`https://backend.yes/UpdateQuestion/${questionEditor.questionId}`, {
                questionText: questionEditor.value
            })
                .then(successResponse => console.log(successResponse))
                .catch(errorResponse => console.error(errorResponse));
        }
    }

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
                            onClick={() => showQuestionEditor(true, undefined, null)}
                        />
                        <Dialog
                            header={<span> {questionEditor.header}</span>}
                            visible={questionEditor.visible}
                            style={{width: "75vw"}}
                            contentStyle={{height: "305px"}}
                            onHide={() => setQuestionEditor({...questionEditor, visible: false})}
                            footer={
                                <Button
                                    label="Save"
                                    tooltip="Save the Question"
                                    size="small"
                                    severity="success"
                                    style={{width: "90px", height: "30px"}}
                                    onClick={() => upsertQuestion()}
                                />
                            }
                        >
                            <InputTextarea
                                value={questionEditor.value}
                                onChange={(e) =>
                                    setQuestionEditor({...questionEditor, value: e.target.value})
                                }
                                autoResize
                                style={{minWidth: "100%"}}
                                placeholder={'Type Question Text'}
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

    const acceptQuestionDeletion = (questionId) => {
        //TODO: implement
        console.log(`Question Deletion not implemented yet, would delete questionId: ${questionId}`);
        axios.delete(`https://backend.yes/deleteQuestion/${questionId}`)
            .then(successResponse => console.log(successResponse))
            .catch(errorResponse => console.error(errorResponse));
    }

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
                onClick={() => showQuestionEditor(false, rowData.questionText, rowData.id)}
            />
            <Button
                label="Delete"
                tooltip="Delete a Question"
                tooltipOptions={{position: "left"}}
                icon="pi pi-trash"
                size="small"
                severity="danger"
                style={{width: "90px"}}
                onClick={() => {
                    confirmDialog({
                        message: 'Do you want to delete this Question?',
                        header: 'Delete Confirmation',
                        icon: 'pi pi-info-circle',
                        acceptClassName: 'p-button-danger',
                        accept: () => acceptQuestionDeletion(rowData.id),
                    });
                }}
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
            <ConfirmDialog/>
        </div>
    );
}

export default ExamQuestions;
