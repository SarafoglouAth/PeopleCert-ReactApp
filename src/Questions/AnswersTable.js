import React, {useEffect, useRef, useState} from "react";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";


function AnswersTable(props){
    const [dialogVisible, setDialogVisible] = useState(false);
    const [value, setValue] = useState("");

    const AdminUiAnswerDeleteUpdateButtons = (
        <Column
            className="p-1 "
            body={
                <div className="flex justify-content-center align-items-center gap-2">
                    <Button
                        tooltip="Update an Answer"
                        tooltipOptions={{ position: "left" }}
                        icon="pi pi pi-pencil"
                        size="small"
                        severity="secondary"
                        style={{ width: "35px" }}
                        onClick={() => {
                            setDialogVisible(true);

                            // setValue("To be implemented");
                        }}
                    ></Button>
                    <Button
                        tooltip="Delete an Answer"
                        tooltipOptions={{ position: "left" }}
                        icon="pi pi-trash"
                        size="small"
                        severity="danger"
                        style={{ width: "35px" }}
                    ></Button>
                </div>
            }
        ></Column>
    );
    function AdminUiAnswerDeleteUpdateButtonsToggle() {
        if (admin) {
            return AdminUiAnswerDeleteUpdateButtons;
        }
    }


    const header = () => {

        return (
            <div className="flex align-items-center gap-2 ">
        <span>
          <h2>Answer</h2>
        </span>
                {admin && (
                    <>
                        {" "}
                        <Button
                            label="Add"
                            tooltip="Add a Answer"
                            icon="pi pi-plus"
                            size="small"
                            severity="success"
                            style={{ width: "90px", height: "30px" }}
                            // onClick={(e) => addRow()}
                            onClick={() => {
                                setDialogVisible(true);
                                                            }}
                        />
                        <Dialog
                            header="Add new Answer"
                            visible={dialogVisible}
                            style={{ width: "75vw" }}
                            contentStyle={{ height: "305px" }}
                            onHide={() => setDialogVisible(false)}
                            footer={
                                <Button
                                    label="Save"
                                    tooltip="Save the Answer"
                                    size="small"
                                    severity="success"
                                    style={{ width: "90px", height: "30px" }}
                                    // onClick={(e) => addRow()}
                                />
                            }
                        >
                            <InputTextarea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                autoResize
                                style={{ minWidth: "100%" }}
                                rows={12}
                            />
                        </Dialog>{" "}
                    </>
                )}
            </div>
        );
    };



    const answers  = props.answers
    const admin = props.admin

    return(
<DataTable
            value={answers}            //του λέω που είναι η λίστα που θέλω να μου φτιάξει με βάση το row
            dataKey="id"
            tableStyle={{minWidth: "5rem"}}
            stripedRows={true}
        >
            <Column
                field="text"                      //του λέω από πού να πάρει απο τη λίστα μου τις καταχωρίσεις για κάθε γραμμή
                header={header}
                style={{width: "95%"}}
            ></Column>
            <Column
                className="p-1 "
                header="Correct"
                body={
                    <div className="flex flex-column justify-content-center align-items-center">
                        <div className="card flex justify-content-center">
                        </div>
                    </div>
                }
            ></Column>
    {AdminUiAnswerDeleteUpdateButtonsToggle()}
        </DataTable>
)
}
export default AnswersTable;