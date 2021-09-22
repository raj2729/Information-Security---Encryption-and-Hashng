import { Container, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import QuizAnswers from './QuizAnswers'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'

const useStyles = makeStyles({
    paper: {
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        borderRadius: "20px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    mainTitle: {
        fontSize: "45px",
        marginBottom: "20px",
    },
    submitButton: {
        marginTop: "20px",
        borderRadius: "999px",
        background: "#9c27b0",
        "&:hover": {
            backgroundColor: "#9c27b0",
            boxShadow:
                "0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2)",
        },
    },
    question: {
        fontSize: "24px",
        marginBottom: "10px",
        fontWeight: "500",
        lineHeight: "35px",
    },
    answer: {
        fontSize: "18px",
        marginBottom: "10px",
        fontWeight: "500",
        lineHeight: "25px",
        marginLeft: "10px",
        display: "flex",
    },
    correctAnswer: {
        color: "green",
    },
    results: {
        display: "flex",
        margin: "0 auto",
        maxWidth: "170px",
        textAlign: "center",
        flexDirection: "column",
    },
});

const Quiz = () => {
    const classes = useStyles();
    const [currentQuizStep, setCurrentQuizStep] = useState("start");
    const [quizData, setQuizData] = useState([]);
    const { courseId } = useParams();
    const [data, setData] = useState([])

    const fetchQuiz = async()=> {
        try{
            const {data} = await axios.get(`/course/getQuizByCourse/${courseId}`)
            setData(data.data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [courseId])
    // const data = [{ 'question': 'Which of this is an Animal?', 'correct': 'Cow', 'incorrect': ['Owl', 'Crow', 'Parrot'] },
    // { 'question': 'Which of this is NOT a bird?', 'correct': 'Cow', 'incorrect': ['Owl', 'Crow', 'Parrot'] }]
    const fetchQuizData = () => {
        const formattedCategory = data.map((cat) => {
            const incorrectAnswersIndexes = cat.incorrect.length;
            const randomIndex = Math.round(
                Math.random() * (incorrectAnswersIndexes - 0) + 0
            );
            cat.incorrect.splice(randomIndex, 0, cat.correct);
            return {
                ...cat,
                answers: cat.incorrect,
            };
        });
        setQuizData(formattedCategory);
        setCurrentQuizStep("results");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!quizData.length) {
            fetchQuizData();
        }
    };

    const resetQuiz = (e) => {
        e.preventDefault();
        setQuizData([]);
        setCurrentQuizStep("start");
        window.scrollTo(0, "20px");
    };

    return (
        <Container>
                {currentQuizStep === "start" ? (
                    <form onSubmit={handleSubmit} className={classes.results}>
                        <Button
                            className={classes.submitButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Start the Quiz
                        </Button>
                    </form>
                ) : (
                    <QuizAnswers
                        classes={classes}
                        quizData={quizData}
                        resetQuiz={resetQuiz}
                        currentQuizStep={currentQuizStep}
                        setCurrentQuizStep={setCurrentQuizStep}
                    />
                )}
        </Container>
    )
}

export default Quiz
