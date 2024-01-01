import React, { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import Exam from "./Tests/Exam";
import PurchasesShowcaseS from "./PurchasesShowcase";

const Purchases = () => {
    const [showExam, setShowExam] = useState(false);
    const [targetedExam, setTargetedExam] = useState(null);
    const [loading, setLoading] = useState(false);
    const [exams, setExams] = useState([]);
    const handleExamSubmission = () => {
        setShowExam(false); // Set showExam to false to stop rendering the exam
    };

    useEffect(()  =>  {

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://api.mocki.io/v2/1e376031/ExamsUserExp");
                setExams(response.data);
                setLoading(false);
                setShowExam(true);
            } catch (error) {
                console.error("Error fetching Exam data:", error);
            }
        };

        if (targetedExam) {

            fetchData();
            setTargetedExam(null);
        }
    }, [targetedExam]);

    return (
        <>
            {showExam ? (
                loading ? (
                    <div className="card flex justify-content-center">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <Exam exams={exams} onExamSubmit={handleExamSubmission} />
                )
            ) : (
                <PurchasesShowcaseS setTargetedExam={setTargetedExam} />
            )}
        </>
    );
};

export default Purchases;
