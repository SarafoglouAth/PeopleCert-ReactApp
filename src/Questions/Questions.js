import React, { useState, useEffect, useRef } from "react";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./Questions.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import QuestionSampleImage from "../Pics/QuestionSampleImage.jpg";

import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../Service/ProductService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";



function Questions() {
  //FOR ROW EXPANSION

  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    ProductService.getProductsWithOrdersSmall().then((data) =>
      setProducts(data)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const expandAll = () => {
    let _expandedRows = {};

    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={QuestionSampleImage}
        alt={rowData.image}
        width="64px"
        className="shadow-4"
        onClick={() => setVisible(true)}
      />
    );
  };


  const rowExpansionTemplate = (test) => {
    return (
      <div className="p-1">
        <DataTable
          value={products}
          dataKey="id"
          tableStyle={{ minWidth: "5rem" }}
          stripedRows={true}
        >
          <Column
            field="code"
            header={
              <div className="flex align-items-center gap-2">
                <span>Answers</span>
                <Button
                  label="Add"
                  tooltip="Add an Answer"
                  icon="pi pi-plus"
                  size="small"
                  severity="success"
                  style={{ width: "90px", height: "30px" }}
                  onClick={(e) => addRow()}
                />
              </div>
            }
            style={{ width: "95%" }}
          ></Column>
          <Column
            className="p-1 "
            header="Correct"
            body={
              <div className="flex flex-column justify-content-center align-items-center">
                <div className="card flex justify-content-center">
                  <Checkbox
                    onChange={(e) => setChecked(e.checked)}
                    checked={checked}
                  ></Checkbox>
                </div>
              </div>
            }
          ></Column>
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
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-between align-items-center gap-2">
      <span>Exam Name</span>
      <div>
        <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
        <Button
          icon="pi pi-minus"
          label="Collapse All"
          onClick={collapseAll}
          text
        />
      </div>
    </div>
  );

  //FOR EDIT ROW
  const questionButtons = (rowData) => (
    <div className="flex flex-column justify-content-center align-items-center gap-2">
      <Button
        label="Answers"
        tooltip="Expand Answers"
        tooltipOptions={{ position: "left" }}
        icon="pi pi-eye"
        size="small"
        severity="info"
        style={{ width: "90px" }}
        onClick={(e) => toggleAnswer(rowData)}
      />
      <Button
        label="Update"
        tooltip="Update a Question"
        tooltipOptions={{ position: "left" }}
        icon="pi pi-pencil"
        size="small"
        severity="secondary"
        style={{ width: "90px" }}
        onClick={(e) => editRow(rowData)}
      />
      <Button
        label="Delete"
        tooltip="Delete a Question"
        tooltipOptions={{ position: "left" }}
        icon="pi pi-trash"
        size="small"
        severity="danger"
        style={{ width: "90px" }}
        onClick={(e) => deleteRow(rowData)}
      />
    </div>
  );


  //FOR IMAGE POPUP

  const [visibleImagePopup, setVisible] = useState(false);

  //FOR Cute popup
  const todoToast = (item) =>
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: `editRow: ${!!item ? JSON.stringify(item) : "empty"}`,
    });

  //Checkbox

  const [checked, setChecked] = useState(false);

  //TO be implemented
  const [editRow, deleteRow, addRow] = [todoToast, todoToast, todoToast];

    //Expand answers list
  const toggleAnswer = (rowData) => {
    if (getExpandedRows().includes(rowData.id)) {
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

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        header={header}
        tableStyle={{ minWidth: "6rem" }}
        stripedRows={true}
      >
        <Column
          field="name"
          header={
            <div className="flex align-items-center gap-2">
              <span>Question</span>
              <Button
                label="Add"
                tooltip="Add a Question"
                icon="pi pi-plus"
                size="small"
                severity="success"
                style={{ width: "90px", height: "30px" }}
                onClick={(e) => addRow()}
              />
            </div>
          }
        />
        <Column
          header="Image"
          body={imageBodyTemplate}
          style={{ width: "120px" }}
        />

        <Column header="Update/Remove" body={questionButtons} />
      </DataTable>
      {/* POPUP Image element */}
      <Dialog
        header="Image"
        visible={visibleImagePopup}
        dismissableMask={true}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <Image src={QuestionSampleImage} alt="Image" width="100%" />
      </Dialog>
    </div>
  );
}

export default Questions;
