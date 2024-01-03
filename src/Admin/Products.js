import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsCRUD from "./ProductsCRUD";
import ExamQuestions from "./Questions/ExamQuestions";

const Products = ({Role}) => {
    const [showQuestions, setShowQuestions] = useState(false);
    const [targetedProduct, setTargetedProduct] = useState(null);
    const [questionsAnswers, setQuestionsAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleQuestionVisibility = () => {
        setShowQuestions(false); // Ensure this is the intended functionality
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://webhook.site/544c124d-fab7-4767-bbdc-0e3a5cfa63c6");
                setQuestionsAnswers(response.data);
                setLoading(false);
                setShowQuestions(true);
            } catch (error) {
                console.error("Error fetching Exam data:", error);
            }
        };

        if (targetedProduct) {
            fetchData();
            setTargetedProduct(null);
        }
    }, [targetedProduct]);

    return (
        <>
            {showQuestions ? (
                <ExamQuestions
                    questionsAnswers={questionsAnswers}
                    handleQuestionVisibility={handleQuestionVisibility}
                    Role={Role}
                />
            ) : (
                <ProductsCRUD
                    setTargetedProduct={setTargetedProduct}
                    Role={Role}
                    handleQuestionVisibility={handleQuestionVisibility}
                />
            )}
        </>
    );
};

export default Products;
