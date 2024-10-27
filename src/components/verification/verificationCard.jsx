import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"; // Use MUI's CircularProgress instead of @material-ui/core
import { makeStyles } from "@mui/styles"; // Use MUI's makeStyles instead of @material-ui/core/styles
import defaultCertificate from "../../Images/default_certificate.avif"; // Fixed typo in "defaultCertificate"
import "./VerificationCard.css";

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh", // Adjust based on your layout
  },
}));

const VerificationCard = () => {
  const classes = useStyles();
  const [studentData, setStudentData] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const mainContentRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    searchInputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    setSubmitted(true);
    setErrorMessage(""); // Reset error message
    try {
      setLoading(true);

      // Fetch student details from the GRTC API
      const studentResponse = await fetch(
        `https://grtcindia.in/grtc-server/api/studentReg/${registrationNo}`
      );
      const studentData = await studentResponse.json();

      if (studentData.data) {
        setStudentData(studentData.data);

        // Fetch exam details from the local Node.js API using the registration number
        const examResponse = await fetch(
          `https://grtc-new-node-backend.onrender.com/api/students/${studentData.data.registrationNo}`
        );
        const examData = await examResponse.json();

        // Assuming examData is structured to hold the exam details
        if (examData) {
          const completedExam = examData.completedExams; // Adjust based on actual response structure

          // Update studentData to include exam details and percentage
          setStudentData((prevData) => ({
            ...prevData,
            attendedExams: examData.attendedExams,
            completedExams: completedExam, // Include the completed exams with percentage
          }));
        } else {
          setErrorMessage("No exam details available for this student");
        }
      } else {
        setStudentData(null);
        setErrorMessage("No student available with this registration number");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box className={classes.loaderContainer}>
        <CircularProgress size={60} style={{ color: "#1eb2a6" }} />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      className="verification-card-container"
      ref={mainContentRef}
    >
      <Box
        className="verification-search-section"
        display="flex"
        justifyContent="center"
        mb={3}
      >
        <TextField
          variant="outlined"
          placeholder="Enter the registration no"
          className="verification-search-input"
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value)}
          inputRef={searchInputRef}
        />
        <Button
          style={{ backgroundColor: "#1eb2a6" }}
          variant="contained"
          className="verification-submit-button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>

      {submitted && errorMessage && (
        <Typography variant="body1" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {submitted && studentData && (
        <Box className="verification-box-section" marginBottom={2}>
          <Box
            className="verification-left-box"
            position="relative"
            p={2}
            boxShadow={3}
            borderRadius={2}
            bgcolor="background.paper"
          >
            <Box
              className="verification-profile-pic"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={studentData.profilePic}
                alt="Profile Pic"
                className="profile-pic-img"
              />
            </Box>
            <Box className="verification-details">
              <Box className="verification-field-row">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.name}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Registration No:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.registrationNo}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  DOB:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.dob}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Date of Admission:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.dateOfAdmission}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Father's Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.fatherName}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Courses:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.course}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            className="verification-right-box"
            p={2}
            boxShadow={3}
            borderRadius={2}
            bgcolor="background.paper"
          >
            {studentData.certificatePic ? (
              <img
                src={studentData.certificatePic}
                alt="Certificate"
                className="certificate-img"
              />
            ) : (
              <img
                src={defaultCertificate}
                alt="Certificate"
                className="certificate-img default-certificate"
              />
            )}
          </Box>
        </Box>
      )}
      {submitted && studentData && studentData.completedExams && (
        <Box className="verification-exam-info">
          {submitted && studentData && studentData.completedExams && (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Exam Details
              </Typography>
              <Paper elevation={3}>
                <Box
                  sx={{
                    display: "table",
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  {studentData.completedExams.map((exam, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "table-row",
                        borderBottom: "1px solid #e0e0e0",
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "table-cell",
                          padding: "16px",
                          textAlign: "left",
                          fontWeight: "bold",
                        }}
                      >
                        {exam.exam.title}
                      </Box>
                      <Box
                        sx={{
                          display: "table-cell",
                          padding: "16px",
                          textAlign: "right",
                        }}
                      >
                        {exam.percentge}%
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default VerificationCard;
