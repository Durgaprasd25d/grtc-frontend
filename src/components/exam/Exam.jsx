import React, { useEffect, useState, useCallback } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useHistory, useLocation } from "react-router-dom";
import Back from "../common/back/Back";

const useStyles = makeStyles((theme) => ({
  container: { padding: theme.spacing(3), backgroundColor: "#f5f5f5" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  profilePic: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  timer: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ff0000",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  questionContainer: {
    height: "550px",
    padding: theme.spacing(3),
  },
  questionPalette: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paletteButton: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: "0.875rem",
  },
  legend: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: "32%",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  legendCircle: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  actionButtons: {
    display: "flex",
    height: "40px",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  },
}));

const Exam = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [exam, setExam] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(3600);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitExam = useCallback(async () => {
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
        alert("Exam submitted successfully");
        history.push(
          `/result?submitResponse=${encodeURIComponent(
            JSON.stringify(submitResponse.data)
          )}`
        );
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
    console.log(answersPayload);
  }, [exam, history, location.search, studentAnswers]);

  useEffect(() => {
    const fetchExamData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        history.push("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          history.push("/login");
          return;
        }

        setStudentData(JSON.parse(localStorage.getItem("studentData")));

        const examId = new URLSearchParams(location.search).get("id");
        const response = await axios.get(
          `https://grtc-new-node-backend.onrender.com/api/exam/${examId}/studentId`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setExam(response.data);

        const timerInterval = setInterval(() => {
          setTimerSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(timerInterval);
              handleSubmitExam();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timerInterval);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        setErrorMessage("Failed to fetch exam data. Please try again.");
      }
    };

    fetchExamData();
  }, [history, location.search, handleSubmitExam]);

  const handleAnswerChange = (questionId, answer) => {
    setStudentAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "answered" }));
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestion(index);
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

  const handleSaveAndMarkForReview = () => {
    const activeQuestionId = exam.questions[currentQuestion]._id;
    const selectedOption = studentAnswers[activeQuestionId];
    if (selectedOption) {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestionId]: "saved",
      }));
    } else {
      delete studentAnswers[activeQuestionId];
    }
  };

  const handleMark = () => {
    const activeQuestionId = exam.questions[currentQuestion]._id;
    if (questionStatus[activeQuestionId] === "marked") {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestionId]: undefined,
      }));
    } else {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestionId]: "marked",
      }));
    }
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

  if (!exam) {
    return (
      <Container className={classes.container} maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  const { questions } = exam;

  return (
    <>
      <Back title="Exam" />
      <Container className={classes.container} maxWidth="md">
        <Box className={classes.header}>
          <Typography
            variant="h4"
            component="h1"
            style={{ fontWeight: "bold" }}
          >
            {exam.title}
          </Typography>
          <Box id="studentInfo" className={classes.header}>
            {profilePicUrl ? (
              <Avatar
                src={profilePicUrl}
                alt="Profile"
                className={classes.profilePic}
              />
            ) : (
              <Avatar className={classes.profilePic}>
                {getInitials(studentData.name)}
              </Avatar>
            )}
            <div>
              <Typography variant="h6">{studentData.name}</Typography>
              <Typography variant="body2">
                Registration No: {studentData.registrationNo}
              </Typography>
            </div>
          </Box>
          <Typography className={classes.timer} id="timer">
            {`${Math.floor(timerSeconds / 3600)
              .toString()
              .padStart(2, "0")}:${Math.floor((timerSeconds % 3600) / 60)
              .toString()
              .padStart(2, "0")}:${(timerSeconds % 60)
              .toString()
              .padStart(2, "0")}`}
          </Typography>
        </Box>
        {errorMessage && (
          <Typography className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={9} id="questionContainer">
            {questions.map((question, index) => (
              <Paper
                key={question._id}
                className={`${classes.questionContainer} ${
                  index === currentQuestion ? "active" : ""
                }`}
                style={{
                  display: index === currentQuestion ? "block" : "none",
                }}
              >
                <Typography variant="h6">Question {index + 1}</Typography>
                <Typography>{question.questionText}</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={studentAnswers[question._id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                  >
                    {question.options.map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.questionPalette}>
              <Typography variant="h6" style={{ marginLeft: 27 }}>
                Question Palette:
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    className={classes.paletteButton}
                    onClick={() => handleQuestionNavigation(index)}
                    style={{
                      backgroundColor: questionStatus[questions[index]._id]
                        ? questionStatus[questions[index]._id] === "answered"
                          ? "#006400"
                          : questionStatus[questions[index]._id] === "saved"
                          ? "#1E90FF"
                          : "#FFD700"
                        : "#8b0000",
                      color: "#fff",
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </Paper>
            <Paper className={classes.legend}>
              <Typography variant="h6">Legend:</Typography>
              <div className={classes.legendItem}>
                <span
                  className={classes.legendCircle}
                  style={{ backgroundColor: "#006400" }}
                ></span>
                Answered
              </div>
              <div className={classes.legendItem}>
                <span
                  className={classes.legendCircle}
                  style={{ backgroundColor: "#1E90FF" }}
                ></span>
                Saved
              </div>
              <div className={classes.legendItem}>
                <span
                  className={classes.legendCircle}
                  style={{ backgroundColor: "#FFD700" }}
                ></span>
                Mark
              </div>
              <div className={classes.legendItem}>
                <span
                  className={classes.legendCircle}
                  style={{ backgroundColor: "#8b0000" }}
                ></span>
                Not Answered
              </div>
            </Paper>
            <Box className={classes.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveAnswer}
              >
                Save
              </Button>
              <div style={{ width: "120px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveAndMarkForReview}
                  style={{
                    width: "100%", // Adjust the width as needed
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Save & Mark
                </Button>
              </div>
              <Button variant="contained" color="primary" onClick={handleMark}>
                Mark
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitExam}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Exam;
