import React, { useEffect, useState, useCallback } from "react";
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
import toast from "react-hot-toast";

const Exam = () => {
  const history = useHistory();
  const location = useLocation();
  const [exam, setExam] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  const handleSubmitExam = useCallback(async (history, location) => {
    setLoading(true);
    console.log("Submitting exam...");

    const unansweredQuestions = exam.questions.some(
      (question) => !studentAnswers[question._id]
    );

    if (unansweredQuestions) {
      setErrorMessage("Please answer all questions before submitting.");
      toast.error("Please answer all questions before submitting.");
      setLoading(false);
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
        const updatedStudentData = {
          ...studentData,
          examsAttended: [...(studentData.examsAttended || []), examId],
        };
        localStorage.setItem("studentData", JSON.stringify(updatedStudentData));
        toast.success("Exam Submitted Successfully");
        setLoading(false);

        const examName = exam.title; // Assuming the exam object has a name property
        console.log("Exam name:", examName); // Debugging line
        history.push(
          `/result?result=${encodeURIComponent(
            JSON.stringify(submitResponse.data)
          )}&examName=${encodeURIComponent(examName)}`
        );
      } else {
        setErrorMessage("Failed to submit the exam.");
        toast.error("Failed to submit the exam.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      setLoading(false);

      if (error.response && error.response.data.errors) {
        const errorMsg = error.response.data.errors[0].msg;
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      } else {
        setErrorMessage("Failed to submit the exam. Please try again.");
        toast.error("Failed to submit the exam. Please try again.");
      }
    }
  }, [exam, studentAnswers, studentData]);

  useEffect(() => {
    const fetchExamData = async () => {
      console.log("Fetching exam data...");
      const token = localStorage.getItem("token");

      if (!token) {
        history.push("/student-login");
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

        console.log("Exam data:", response.data); // Debugging line
        setExam(response.data);
        setStudentData(JSON.parse(localStorage.getItem("studentData")));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        setErrorMessage("Failed to fetch exam data. Please try again.");
        setLoading(false);
      }
    };

    fetchExamData();
  }, [history, location.search]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitExam(history, location);
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, handleSubmitExam, history, location]);

  const handleAnswerChange = (questionId, answer) => {
    setStudentAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "answered" }));
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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
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
              <Typography variant="subtitle1">
                Student: {studentData.name}
              </Typography>
              <Avatar
                src={profilePicUrl}
                alt="Student Avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "20px",
                }}
              >
                {getInitials(studentData.name)}
              </Avatar>
              {questions.length === 0 ? (
                <Typography variant="h6">
                  No questions available for this exam.
                </Typography>
              ) : (
                <>
                  <Typography variant="h6">
                    Question {currentQuestion + 1}:{" "}
                    {questions[currentQuestion].questionText}
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label={`question-${currentQuestion + 1}`}
                      name={`question-${currentQuestion + 1}`}
                      value={
                        studentAnswers[questions[currentQuestion]._id] || ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(
                          questions[currentQuestion]._id,
                          e.target.value
                        )
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
                  onClick={() => handleSubmitExam(history, location)}
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
              <Typography variant="subtitle1" color="textSecondary">
                Time left: {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Exam;
