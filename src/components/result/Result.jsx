import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  Divider,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import Back from "../common/back/Back";
import { jsPDF } from "jspdf";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    maxWidth: 600,
    margin: "auto",
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  examName: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: theme.palette.secondary.main,
    textAlign: "center",
  },
  text: {
    marginBottom: theme.spacing(1),
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  percentage: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: theme.palette.success.main,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: "#1EB2A6", // Set button color to #1EB2A6
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#179588", // Darker version of #1EB2A6
      transform: "scale(1.02)",
    },
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    padding: theme.spacing(4),
  },
}));

// Custom theme with the primary color set to #1EB2A6
const theme = createTheme({
  palette: {
    primary: {
      main: "#1EB2A6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1EB2A6",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#fff",
    },
  },
});

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
    localStorage.clear();
    history.push("/");
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const resultText = `
      Exam Name: ${examName}
      Student Registration No: ${studentRegistrationNo}
      Total Questions: ${result.totalQuestions}
      Attended Questions: ${result.attendedQuestions}
      Correct Answers: ${result.correctAnswers}
      Percentage: ${calculatePercentage(
        result.correctAnswers,
        result.totalQuestions
      )}%
    `;
    doc.text(resultText, 10, 10);
    doc.save(`${studentRegistrationNo}.pdf`);
  };

  const calculatePercentage = (correct, total) => {
    return ((correct / total) * 100).toFixed(2);
  };

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (!result) {
    return <Typography>Error loading result data.</Typography>;
  }

  const { attendedQuestions, correctAnswers, totalQuestions } = result;

  return (
    <ThemeProvider theme={theme}>
      <Back title="Result" />
      <Container style={{ marginBottom: "10px" }}>
        <Paper className={classes.root} elevation={3}>
          <Typography variant="h4" className={classes.title}>
            Exam Result
          </Typography>
          <Typography variant="h6" className={classes.examName}>
            Exam Name: {examName}
          </Typography>
          <Typography variant="h6" className={classes.examName}>
            Student Registration No: {studentRegistrationNo}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body1" className={classes.text}>
            Total Questions: {totalQuestions}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Attended Questions: {attendedQuestions}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Correct Answers: {correctAnswers}
          </Typography>
          <Typography className={classes.percentage}>
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
    </ThemeProvider>
  );
};

export default Result;
