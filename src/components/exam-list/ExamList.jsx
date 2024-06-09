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
}));

const ExamList = () => {
  const classes = useStyles();
  const [exams, setExams] = useState([]);
  const history = useHistory();
  const studentData = JSON.parse(localStorage.getItem("studentData"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
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
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [history]);

  return (
    <>
      <Back title="Exam List" />
      <Container className={classes.container} maxWidth="md">
        <Box className={classes.header}>
          <Avatar
            src={`https://grtc-new-node-backend.onrender.com/${studentData.profilePic.replace(
              /\\/g,
              "/"
            )}`}
            alt="Profile"
            className={classes.profilePic}
          />
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
