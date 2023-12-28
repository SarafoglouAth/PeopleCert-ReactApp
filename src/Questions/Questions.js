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
import { InputTextarea } from "primereact/inputtextarea";

//make an obvious difference between question space and answer's

function Questions() {
  //FOR ROW EXPANSION

  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    ProductService.getProductsWithOrdersSmall().then((data) => {
      console.log(data);
      // data[0].name =
      setProducts(data);
    });
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

  //Testing Admin ui

  const [dialogVisibleasAnswers, setDialogVisibleAnswers] = useState(false);
  const [value, setValue] = useState("");
  const [admin, setAdminValue] = useState(true);

  const AnswerWithoutButtons = (
    <div className="flex align-items-center gap-2 ">
      <span>
        <h4>Answers</h4>
      </span>
    </div>
  );

  const AnswerWithButtons = (
    <div className="flex align-items-center gap-2 ">
      <span>
        <h4>Answers</h4>
      </span>
      <Button
        label="Add"
        tooltip="Add an Answer"
        icon="pi pi-plus"
        size="small"
        severity="success"
        style={{ width: "90px", height: "30px" }}
        onClick={() => setDialogVisibleAnswers(true)}
        // onClick={(e) => addRow()}
      />
      <Dialog
        header="Add new Answer"
        visible={dialogVisibleasAnswers}
        style={{ width: "75vw" }}
        contentStyle={{ height: "305px" }}
        onHide={() => setDialogVisibleAnswers(false)}
        footer={
          <Button
            label="Save"
            tooltip="Save the Answer"
            icon="pi pi-plus"
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
      </Dialog>
    </div>
  );

  function AdminUiAnswerAddButton() {
    if (admin) {
      return AnswerWithButtons;
    }
    return AnswerWithoutButtons;
  }

  //end of testing

  //admin answer delete/update start

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

  //admin answer delete update end

  const rowExpansionTemplate = () => {
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
            header={AdminUiAnswerAddButton}
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
          {AdminUiAnswerDeleteUpdateButtonsToggle()}
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-between align-items-center gap-2">
      <span>
        <h1>Exam Name</h1>
      </span>
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

  //admin questions delete/update start

  function AdminUiQuestionsDeleteUpdateButtonsToggle() {
    if (admin) {
      return <Column header="Update/Remove" body={questionButtons} />;
    }
    return <Column body={questionButtonsViewOnly} />;
  }

  const questionButtonsViewOnly = (rowData) => (
    <div className="flex flex-column justify-content-center align-items-center gap-1">
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
    </div>
  );
  //admin questions delete/update end

  //FOR EDIT ROW
  const questionButtons = (rowData) => (
    <div className="flex flex-column justify-content-center align-items-center gap-1">
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
        // onClick={(e) => editRow(rowData)}
      />
      <Button
        label="Delete"
        tooltip="Delete a Question"
        tooltipOptions={{ position: "left" }}
        icon="pi pi-trash"
        size="small"
        severity="danger"
        style={{ width: "90px" }}
        // onClick={(e) => deleteRow(rowData)}
      />
    </div>
  );

  //FOR IMAGE POPUP

  const [visibleImagePopup, setVisible] = useState(false);

  //Checkbox

  const [checked, setChecked] = useState(false);

  //TO be implemented
  //const [editRow, deleteRow, addRow] = [todoToast, todoToast, todoToast];

  //Expand answers list
  const toggleAnswer = (rowData) => {
    if (getExpandedRows().includes(rowData.id)) {
      setExpandedRows(null);
      return;
    }

    const _expandedRow = { [rowData.id]: true };

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

  //for text input
  const [dialogVisible, setDialogVisible] = useState(false);

  //admin add questions start

  const AdminUiQestionsAddButtonOn = (
    <div className="flex align-items-center gap-2 ">
      <span>
        <h2>Question</h2>
      </span>
      <Button
        label="Add"
        tooltip="Add a Question"
        icon="pi pi-plus"
        size="small"
        severity="success"
        style={{ width: "90px", height: "30px" }}
        // onClick={(e) => addRow()}
        onClick={() => setDialogVisible(true)}
      />
      <Dialog
        header="Add new Question"
        visible={dialogVisible}
        style={{ width: "75vw" }}
        contentStyle={{ height: "305px" }}
        onHide={() => setDialogVisible(false)}
        footer={
          <Button
            label="Save"
            tooltip="Save the Question"
            icon="pi pi-plus"
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
      </Dialog>
    </div>
  );

  const AdminUiQestionsAddButtonOff = (
    <div className="flex align-items-center gap-2 ">
      <span>
        <h2>Question</h2>
      </span>
    </div>
  );

  function AdminUiQestionsAddButtonToggle() {
    if (admin) {
      return AdminUiQestionsAddButtonOn;
    }
    return AdminUiQestionsAddButtonOff;
  }

  //admin add questions end

  //admin delete update image start

  const AdminUiImageDeleteUpdateOn = (
    <div className="flex align-items-center gap-2">
      <span>Image</span>
      <Button
        label="Delete"
        tooltip="Delete Image"
        tooltipOptions={{ position: "top" }}
        icon="pi pi-trash"
        size="small"
        severity="danger"
        style={{ width: "90px" }}
        // onClick={(e) => deleteRow(rowData)}
      />
      <Button
        label="Update"
        tooltip="Update Image"
        tooltipOptions={{ position: "top" }}
        icon="pi pi-pencil"
        size="small"
        severity="secondary"
        style={{ width: "90px" }}
        // onClick={(e) => deleteRow(rowData)}
      />
    </div>
  );

  const AdminUiImageDeleteUpdateOff = (
    <div className="flex align-items-center gap-2">
      <span>Image</span>
    </div>
  );

  function AdminUiImageToggle() {
    if (admin) {
      return AdminUiImageDeleteUpdateOn;
    }
    return AdminUiImageDeleteUpdateOff;
  }

  //admin delete update image end

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
          header={AdminUiQestionsAddButtonToggle}
          className="text-lg"
        />
        <Column
          header="Image"
          body={imageBodyTemplate}
          style={{ width: "120px" }}
        />

        {AdminUiQuestionsDeleteUpdateButtonsToggle()}
      </DataTable>
      {/* POPUP Image element */}
      <Dialog
        header={AdminUiImageToggle}
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
