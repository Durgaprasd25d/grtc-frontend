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
} from "@material-ui/core";
import Back from "../common/back/Back";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  text: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#1eb2a6",
  },
}));

const Result = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const resultData = JSON.parse(
          decodeURIComponent(searchParams.get("result"))
        );
        setResult(resultData);
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

  if (loading) {
    return <CircularProgress />;
  }

  if (!result) {
    return <Typography>Error loading result data.</Typography>;
  }

  const { attendedQuestions, correctAnswers, totalQuestions } = result;

  const calculatePercentage = (correct, total) => {
    return ((correct / total) * 100).toFixed(2);
  };

  return (
    <>
      <Back title="Result" />
      <Container maxWidth="sm">
        <Paper className={classes.root} elevation={3}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Exam Result
          </Typography>
          <Typography variant="h6" className={classes.text}>
            Total Questions: {totalQuestions}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Attended Questions: {attendedQuestions}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Correct Answers: {correctAnswers}
          </Typography>
          <Typography variant="body1" className={classes.text} gutterBottom>
            Percentage: {calculatePercentage(correctAnswers, totalQuestions)}%
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleContinue}
            fullWidth
          >
            Continue
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Result;
