import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "primereact/button";
import {Card} from "primereact/card";



const MyPurchases = ({ title, image,ExamDate,ScheduleTest,takeTheTest,isTestTaken  }) => {
    const header = ( <img src={image} alt={title}/>); // Header for the product card



    const footer = (
        <>
            {/*  Conditional rendering of button based on the test date  */}
            {isTestTaken ? <Button className="Rounded" disabled label="Waiting For results" severity="secondary"></Button> :
                !ExamDate ? <Button className="Rounded" onClick={ScheduleTest} label="Schedule the test" severity="info"></Button> :
                    ExamDate===new Date().toLocaleDateString() ? <Button className="Rounded" onClick={takeTheTest} label="Take the test" severity="success"></Button> :
                <Button className="Rounded" onClick={ScheduleTest} label="Reschedule" severity="help"></Button>}

        </>
    );

    // Return the card component displaying product details
    return (
        <>
            <Card title={title} footer={footer} header={header} className="TxtAlCntr" style={{ height: "100%" }} >
                <h3>{isTestTaken ?"The test was taken at "+ExamDate :!ExamDate ? "Schedule  at your convenience" : "The test is Scheduled at "+ExamDate}</h3>
            </Card>

        </>

    );
};
export default MyPurchases;
