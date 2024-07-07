import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Back from "../common/back/Back";

const Exam = () => {
  const history = useHistory();
  const location = useLocation();
  const [exam, setExam] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(3600);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const timerIntervalRef = useRef(null);

  const handleSubmitExam = useCallback(async () => {
    console.log("Submitting exam...");
    const unansweredQuestions = exam.questions.some(
      (question) => !studentAnswers[question._id]
    );

    if (unansweredQuestions) {
      setErrorMessage("Please answer all questions before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    const examId = new URLSearchParams(location.search).get("id");
    const answersPayload = {
      answers: Object.keys(studentAnswers).map((questionId) => ({
        questionId,
        answer: studentAnswers[questionId],
      })),
    };

    try {
      const submitResponse = await axios.post(
        `https://grtc-new-node-backend.onrender.com/api/exam/${examId}/attend`,
        answersPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (submitResponse.data) {
        // Update local storage with new student data
        const updatedStudentData = {
          ...studentData,
          examsAttended: [...(studentData.examsAttended || []), examId],
          // You can add more fields if needed
        };
        localStorage.setItem("studentData", JSON.stringify(updatedStudentData));

        // Redirect to result page with result data
        history.push(`/result?result=${encodeURIComponent(JSON.stringify(submitResponse.data))}`);
      } else {
        setErrorMessage("Failed to submit the exam.");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      if (error.response && error.response.data.errors) {
        setErrorMessage(error.response.data.errors[0].msg);
      } else {
        setErrorMessage("Failed to submit the exam. Please try again.");
      }
    }
  }, [exam, history, location.search, studentAnswers, studentData]);

  useEffect(() => {
    const fetchExamData = async () => {
      console.log("Fetching exam data...");
      const token = localStorage.getItem("token");

      if (!token) {
        history.push("/login");
        return;
      }

      try {
        const examId = new URLSearchParams(location.search).get("id");
        const response = await axios.get(
          `https://grtc-new-node-backend.onrender.com/api/exam/${examId}/studentId`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setExam(response.data);
        setStudentData(JSON.parse(localStorage.getItem("studentData")));
        setLoading(false);

        if (!timerIntervalRef.current) {
          timerIntervalRef.current = setInterval(() => {
            setTimerSeconds((prev) => {
              if (prev <= 1) {
                clearInterval(timerIntervalRef.current);
                handleSubmitExam();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
        setErrorMessage("Failed to fetch exam data. Please try again.");
        setLoading(false);
      }
    };

    fetchExamData();

    return () => clearInterval(timerIntervalRef.current);
  }, [history, location.search, handleSubmitExam]);

  const handleAnswerChange = (questionId, answer) => {
    setStudentAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "answered" }));
  };

  const handleSaveAnswer = () => {
    const activeQuestionId = exam.questions[currentQuestion]._id;
    const selectedOption = studentAnswers[activeQuestionId];
    if (selectedOption) {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestionId]: "answered",
      }));
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const profilePicUrl = studentData.profilePic
    ? `https://grtc-new-node-backend.onrender.com/${studentData.profilePic.replace(
        /\\/g,
        "/"
      )}`
    : "";

  const getInitials = (name) => {
    if (!name) return "";
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!exam) {
    return <Typography>Error loading exam data.</Typography>;
  }

  const { questions } = exam;

  return (
    <>
      <Back title="Exam" />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper elevation={3} style={{ padding: "10px" }}>
              <Typography variant="h6">Questions</Typography>
              <Grid container spacing={1}>
                {questions.length === 0 ? (
                  <Typography>No questions available for this exam.</Typography>
                ) : (
                  questions.map((question, index) => (
                    <Grid item xs={3} key={question._id}>
                      <ListItem
                        button
                        onClick={() => setCurrentQuestion(index)}
                        selected={currentQuestion === index}
                        style={{ justifyContent: "center" }}
                      >
                        <ListItemText primary={index + 1} />
                      </ListItem>
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h4">{exam.title}</Typography>
              <Typography variant="subtitle1">Timer: {formatTime(timerSeconds)}</Typography>
              <Typography variant="subtitle1">Student: {studentData.name}</Typography>
              <Avatar
                src={profilePicUrl}
                alt="Student Avatar"
                style={{ width: "100px", height: "100px", marginBottom: "20px" }}
              >
                {getInitials(studentData.name)}
              </Avatar>
              {questions.length === 0 ? (
                <Typography variant="h6">No questions available for this exam.</Typography>
              ) : (
                <>
                  <Typography variant="h6">
                    Question {currentQuestion + 1}: {questions[currentQuestion].questionText}
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label={`question-${currentQuestion + 1}`}
                      name={`question-${currentQuestion + 1}`}
                      value={studentAnswers[questions[currentQuestion]._id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(questions[currentQuestion]._id, e.target.value)
                      }
                    >
                      {questions[currentQuestion].options.map((option, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </>
              )}
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveAnswer}
                  disabled={questions.length === 0}
                >
                  Save Answer
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitExam}
                  style={{ marginLeft: "10px" }}
                  disabled={
                    questions.length === 0 ||
                    Object.keys(studentAnswers).length !== questions.length
                  }
                >
                  Submit Exam
                </Button>
              </Box>
              {errorMessage && (
                <Typography variant="subtitle2" color="error">
                  {errorMessage}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Exam;
