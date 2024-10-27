import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  makeStyles,
  Divider,
} from "@material-ui/core";
import Back from "../common/back/Back";
import {jsPDF} from "jspdf";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  examName: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  text: {
    marginBottom: theme.spacing(1),
    fontSize: "1.1rem",
    color: theme.palette.text.secondary,
  },
  percentage: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: theme.palette.success.main,
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

const Result = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examName, setExamName] = useState("");
  const [studentRegistrationNo, setStudentRegistrationNo] = useState("");

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const resultData = JSON.parse(
          decodeURIComponent(searchParams.get("result"))
        );
        const name = searchParams.get("examName");
        const registrationNo = searchParams.get("registrationNo");
        setResult(resultData);
        setStudentRegistrationNo(registrationNo);
        setExamName(name);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching result data:", error);
        setLoading(false);
      }
    };

    fetchResultData();
  }, [location.search]);

  const handleContinue = () => {
    // Clear localStorage data
    localStorage.clear();
    history.push("/");
  };

  const handleDownload = () => {
    const doc = new jsPDF();
  
    // Text to display in the PDF
    const resultText = `
      Exam Name: ${examName}
      Student Registration No: ${studentRegistrationNo}
      Total Questions: ${result.totalQuestions}
      Attended Questions: ${result.attendedQuestions}
      Correct Answers: ${result.correctAnswers}
      Percentage: ${calculatePercentage(result.correctAnswers, result.totalQuestions)}%
    `;
  
    // Add the text to the PDF
    doc.text(resultText, 10, 10);
  
    // Download the PDF
    doc.save(`${studentRegistrationNo}.pdf`);
  };

  const calculatePercentage = (correct, total) => {
    return ((correct / total) * 100).toFixed(2);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!result) {
    return <Typography>Error loading result data.</Typography>;
  }

  const { attendedQuestions, correctAnswers, totalQuestions } = result;

  return (
    <>
      <Back title="Result" />
      <Container maxWidth="sm">
        <Paper className={classes.root} elevation={3}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Exam Result
          </Typography>
          <Typography variant="h5" className={classes.examName} gutterBottom>
            Exam Name : {examName}
          </Typography>
          <Typography variant="h5" className={classes.examName} gutterBottom>
            Student Registration No : {studentRegistrationNo}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.text}>
            Total Questions: {totalQuestions}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Attended Questions: {attendedQuestions}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Correct Answers: {correctAnswers}
          </Typography>
          <Typography
            variant="body1"
            className={`${classes.text} ${classes.percentage}`}
            gutterBottom
          >
            Percentage: {calculatePercentage(correctAnswers, totalQuestions)}%
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleContinue}
            fullWidth
          >
            Continue
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleDownload}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Download Result
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Result;
