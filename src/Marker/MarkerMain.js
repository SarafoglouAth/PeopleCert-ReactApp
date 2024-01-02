import "./MarkerHub.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import TestCorrectionData from "../QualityControl/TestCorrectionData";

const MarkerMain = () => {
    const [exams, setExams] = useState([]);
    const markers = ["Marker 1", "Marker 2", "Marker 3"]; // Replace with real data
    const [showPopup, setShowPopup] = useState(false);
    const [answers, setAnswers] = useState({});
    const [scoreByMarker, setScoreByMarker] = useState(null);
    const handleAnswerChange = (e, QuestionID) => {
        const {value} = e.target;
        setAnswers({...answers, [QuestionID]: value});
    };
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get("https://mocki.io/v1/c7451e50-416f-4cda-9e79-dd77f071d4d3"); // Replace with your API endpoint
                setExams(response.data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            }
        };

        fetchExams();
    }, []);

    const closePopup = () => {
        setShowPopup(false);
    };

    function handleMarkerScore(e) {
        e.preventDefault();
        console.log("Score: ", scoreByMarker + "%");
        console.log("By: ", markers[0]);
        setShowPopup(false);
    }

    const handleAssignMarker = (examId) => {
        setShowPopup(true);
    };

    return (
        <div className="marker-hub">
            <h1>Assigned exams for {markers[0]}</h1>
            {exams.map((exam) => (
                (exam.Score === null || exam.Score === undefined) && (
                    <div key={exam.id} className="exam-item">
                        <h2>{exam.title} taken by UserTofix</h2>
                        <p>{exam.testDate}</p>
                        <button onClick={() => handleAssignMarker(exam.id)}>Mark the test</button>
                    </div>
                )
            ))}
            {showPopup && (
                <div className={`popup-Marker-inner ${showPopup ? 'show' : ''}`}>
                    <h2>Question Details</h2>
                    <form onSubmit={handleMarkerScore}>
                        {TestCorrectionData.map((question) => (
                            <div key={question.QuestionID} className="question">
                                <p style={{color: question.PossibleAnswers[0].IsAnswerGiven === question.PossibleAnswers[0].IsCorrectAnswer ? 'green' : 'red'}}>{question.QuestionText}</p>
                                {question.PossibleAnswers.map((answer) => (

                                    <label key={answer.AnswerID}>
                                        <input
                                            type="radio"
                                            name={`question_${question.QuestionID}`}
                                            value={answer.AnswerID}
                                            checked={answer.IsAnswerGiven}
                                            onChange={(e) => handleAnswerChange(e, question.QuestionID, answer.AnswerID)}
                                        />
                                        {answer.AnswerText || answer.AnswerTextA || answer.AnswerTextB}

                                    </label>
                                ))}

                            </div>
                        ))}
                        {showPopup && (<>
                                <div className="center-input">
                                    <input
                                        type="number"
                                        name="score"
                                        id="score"
                                        min="0"
                                        max="100"
                                        style={{width: '50px'}}

                                        onChange={(e) => setScoreByMarker(e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
                                    />
                                    %
                                </div>
                                <button type="submit" className="submit-btn">
                                    Submit
                                </button>
                            </>
                        )}

                    </form>
                    <button onClick={closePopup}>Close</button>
                </div>
            )}
        </div>
    );
};

export default MarkerMain;