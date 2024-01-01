import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Exams.css";
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import {RadioButton} from "primereact/radiobutton";
import { Image } from 'primereact/image';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import {useNavigate} from "react-router-dom";

const Exam = ({exams ,onExamSubmit  }) => {
    const toast = useRef(null);

    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(10); // Initial timer value
    const [submitted, setSubmitted] = useState(false);
    // Update user's selected answer
    const handleAnswerChange = (questionId, answerId) => {
        setAnswers({ ...answers, [questionId]: answerId });
    };

    // Handle form submission
    const ShowResults= () => {
        const updatedAnswers = { ...answers };

        exams.forEach((test) => {
            test.Questions.forEach((question) => {
                if (!(question.id in updatedAnswers)) {
                    updatedAnswers[question.id] = null;
                }
            });
        });

        console.log('Submitted Answers:', updatedAnswers);
        setAnswers(updatedAnswers);
        setSubmitted(true);
        onExamSubmit();
    }

    const handleSubmit = (event) => {

        ShowResults();
        toast.current.show({
            severity: 'success',
            summary: 'Answers submitted',
            detail: 'The answers you picked  were submitted .',
            life: 3000
        });
    };




    useEffect(() => {
        let countdown;
         if (!submitted && timer > 0) {
            countdown = setTimeout(() => setTimer(timer - 1), 1000);
        } else if (timer === 0) {
            setSubmitted(true);
            toast.current.show({
                severity: 'error',
                summary: 'Time over',
                detail: 'The answers you picked were submitted.',
                life: 3000
            });
            ShowResults();
        }

        return () => clearTimeout(countdown);
    }, [timer, submitted]);

    const Showtime = ({ timer }) => {
        const formatTime = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            let timeString = '';

            if (hours > 0) {
                timeString += `${hours} hrs `;
            }

            if (minutes > 0 || hours > 0) {
                timeString += `${minutes} min `;
            }

            timeString += `${secs} sec`;

            return timeString.trim();
        };

        return (
            <div className="timer">
                Time left: {formatTime(timer)}
            </div>
        );
    };
    const showConfirmation = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept
        });
    };
    const accept = (e) => {
        handleSubmit(e);
    }



    return (<>

        <Toast ref={toast} />
       <>
                <div className="container">
                    {Showtime({ timer })}
                    <form onSubmit={handleSubmit}>
                        {exams.map((test, index) => (
                            <div className="quizLayer" key={index}>
                                <h1>{test.TestName} <br/>Test ID: {test.TestID}  <br/> {new Date().toLocaleDateString()}</h1>

                                {test.Questions.map((question) => (
                                    <div className="quiz" key={question.id}>
                                        <h3>{question.id}) {question.questionText}</h3>
                                        {question.HasPicture && <Image src={question.HasPicture}   height="100%" alt={question.questionText} width="100%" preview />}
                                        {question.Answers.map((answer) => (
                                            <div key={answer.id} className="flex align-items-center" >
                                                <RadioButton inputId={question.id} name="answer" value={answer.id}
                                                             onChange={() => handleAnswerChange(question.id, answer.id)}
                                                             checked={answers[question.id] === answer.id} />
                                                <label htmlFor={`question_${question.id}`} className="ml-2">{answer.text}</label>
                                            </div>

                                        ))}

                                    </div>
                                ))}
                            </div>

                        ) )}

                    </form>
                    <div className="flex justify-content-center">

                        <Button onClick={showConfirmation} icon="pi pi-check" label="Confirm" style={{ marginBottom: "10%" }}  className="mr-2"></Button>
                    </div>
                </div></>)

            <ConfirmDialog />
        </>

    );
};

export default Exam;
