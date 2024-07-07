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
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const studentData = JSON.parse(localStorage.getItem("studentData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        
        const response = await axios.get("https://grtc-new-node-backend.onrender.com/api/exam/student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter exams based on assigned exams
        const assignedExamIds = studentData.hasAssignedExams;
        const filteredExams = response.data.filter(exam => assignedExamIds.includes(exam._id));

        setExams(filteredExams);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exams:", error.message);
        setLoading(false);
        // Handle error (e.g., redirect to login page)
        history.push("/student-login");
      }
    };

    fetchData();
  }, [history]);

  const isExamAttended = (examId) => {
    // Check if attendedExamsList is defined and is an array
    if (studentData.attendedExamsList && Array.isArray(studentData.attendedExamsList)) {
      // Check if examId exists in attendedExamsList
      return studentData.attendedExamsList.includes(examId);
    }
    // Default to false if attendedExamsList is not properly defined
    return false;
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
          {studentData && studentData.profilePic ? (
            <Avatar src={`https://grtc-new-node-backend.onrender.com/${studentData.profilePic.replace(/\\/g, "/")}`} alt="Profile" className={classes.profilePic} />
          ) : (
            <Avatar className={classes.profilePic}>
              {studentData ? studentData.name.charAt(0).toUpperCase() : ""}
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
                    {isExamAttended(exam._id) ? (
                      <Typography variant="body2">Already Attended</Typography>
                    ) : (
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => history.push(`/exam?id=${exam._id}`)}
                      >
                        Start Exam
                      </Button>
                    )}
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
