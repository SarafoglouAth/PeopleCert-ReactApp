import "../Marker/MarkerHub.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import TestCorrectionData from "../TestCorrectionData";    // Replace with real data

const ExamCRUD = () => {
    const [exams, setExams] = useState([]);
    const [markers, setMarkers] = useState(["Marker 1", "Marker 2", "Marker 3"]); // Replace with real data
    const [selectedMarker, setSelectedMarker] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [answers, setAnswers] = useState({});
    const [scoreByMarker, setScoreByMarker] = useState(null);
    const handleAnswerChange = (e, QuestionID) => {
        const {value} = e.target;
        setAnswers({...answers, [QuestionID]: value});
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    function handleMarkerScore(e) {
        e.preventDefault();
        console.log("Score: ", scoreByMarker + "%");
        console.log("By: ", markers[0]);
        setShowPopup(false);
    }

    const handleAdminMark = (examId) => {
        setShowPopup(true);
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

    const handleMarkerChange = (e) => {
        setSelectedMarker(e.target.value);
    };

    const handleAssignMarker = (examId) => {
        console.log(`Assigning ${selectedMarker} to exam ${examId}`);
        // Add your logic here to assign the marker to the exam
    };

    function DeleteExam(id) {
        console.log("delete goes Brrrrr")
    }

    return (
        <div className="marker-hub">
            <h1>Available exams</h1>
            {exams.map((exam) => (
                (exam.Score === null || exam.Score === undefined) && (
                    <div key={exam.id} className="exam-item">
                        <h2>{exam.title}</h2>
                        <p>{exam.description}</p>

                        <select onChange={handleMarkerChange}>
                            <option value="">Select a marker</option>
                            {markers.map((marker, index) => (
                                <option key={index} value={marker}>
                                    {marker}
                                </option>
                            ))}
                        </select>
                        <div className="many-buttons">
                            <button onClick={() => handleAssignMarker(exam.id)}>Assign Marker</button>
                            <button onClick={() => handleAdminMark(exam.id)}>Mark exam</button>
                            <button onClick={() => DeleteExam(exam.id)}>Delete exam</button>
                        </div>
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

export default ExamCRUD;