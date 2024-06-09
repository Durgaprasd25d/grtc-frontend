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
  },
  profilePic: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  timer: { fontSize: "1.5rem", fontWeight: "bold", color: "#ff0000" },
  questionContainer: {
    padding: theme.spacing(3),
    width: "100%",
    height: "100%",
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
    height: 100,
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
    justifyContent: "center",
    marginTop: theme.spacing(3),
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
  const [timerSeconds, setTimerSeconds] = useState(3600);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitExam = useCallback(async () => {
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
  }, [history, location.search, studentAnswers]);

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
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestion(index);
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
            <Avatar
              src={`https://grtc-new-node-backend.onrender.com/${studentData.profilePic.replace(
                /\\/g,
                "/"
              )}`}
              alt="Profile"
              className={classes.profilePic}
            />
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
                      backgroundColor: studentAnswers[questions[index]._id]
                        ? "#006400"
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
                  style={{ backgroundColor: "#8b0000" }}
                ></span>
                Not Answered
              </div>
            </Paper>
            <Box className={classes.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitExam}
              >
                Submit Exam
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Exam;
