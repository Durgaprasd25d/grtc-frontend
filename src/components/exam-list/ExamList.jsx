import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import Back from "../common/back/Back";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: "50%",
  },
  table: {
    minWidth: 650,
  },
  button: {
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: theme.palette.grey[400],
    },
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh', // Adjust based on your layout
  },
}));

const ExamList = () => {
  const classes = useStyles();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // Use useHistory for navigation
  const studentData = JSON.parse(localStorage.getItem("studentData"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/student-login");
      return;
    }

    axios
      .get("https://grtc-new-node-backend.onrender.com/api/exam/student", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExams(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          history.push("/student-login");
        } else {
          console.error("Error:", error.message);
        }
        setLoading(false);
      });
  }, [history]);

  useEffect(() => {
    if (!studentData) {
      history.push("/student-login");
    }
  }, [studentData, history]);

  const profilePicUrl = studentData
    ? studentData.profilePic
      ? `https://grtc-new-node-backend.onrender.com/${studentData.profilePic.replace(/\\/g, "/")}`
      : ""
    : "";

  const getInitials = (name) => {
    if (!name) return "";
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  if (loading) {
    return (
      <Box className={classes.loaderContainer}>
        <CircularProgress size={60} style={{ color: "#1eb2a6" }} />
      </Box>
    );
  }

  return (
    <>
      <Back title="Exam List" />
      <Container className={classes.container} maxWidth="md">
        <Box className={classes.header}>
          {profilePicUrl ? (
            <Avatar src={profilePicUrl} alt="Profile" className={classes.profilePic} />
          ) : (
            <Avatar className={classes.profilePic}>
              {getInitials(studentData.name)}
            </Avatar>
          )}
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="exam table">
            <TableHead>
              <TableRow>
                <TableCell>Exam Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam._id}>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>{exam.description}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      className={classes.button}
                      onClick={() => history.push(`/exam?id=${exam._id}`)}
                    >
                      Start Exam
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ExamList;
