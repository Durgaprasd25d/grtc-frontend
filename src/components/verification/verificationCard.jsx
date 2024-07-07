import React, { useState } from "react";
import { Box, Button, TextField, Container, Typography } from "@mui/material";
import "./VerificationCard.css";
import defaultCertifictate from "../../Images/default_certificate.avif";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  const handleSubmit = async () => {
    setSubmitted(true);
    setErrorMessage(""); // Reset error message
    try {
      setLoading(true);
      const response = await fetch(
        `https://grtcindia.in/grtc-server/api/studentReg/${registrationNo}`
      );
      const data = await response.json();
      setLoading(false);

      if (data.data) {
        setStudentData(data.data);
      } else {
        setStudentData(null);
        setErrorMessage("No student available with this registration no");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setErrorMessage("Not found, Please try again.");
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
    <Container maxWidth="lg" className="verification-card-container">
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
        />
        <Button
          style={{ marginLeft: "5px", backgroundColor: "#1eb2a6" }}
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
        <Box className="verification-box-section">
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
            <Typography variant="body1" gutterBottom>
              Name: {studentData.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Registration No: {studentData.registrationNo}
            </Typography>
            <Typography variant="body1" gutterBottom>
              DOB: {studentData.dob}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date of Admission: {studentData.dateOfAdmission}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Father's Name: {studentData.fatherName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Courses: {studentData.course}
            </Typography>
          </Box>
          <Box
            className="verification-right-box"
            p={2}
            boxShadow={3}
            borderRadius={2}
            bgcolor="background.paper"
          >
            {studentData.certificatepic ? (
              <img
                src={studentData.certificatepic}
                alt="Certificate"
                className="certificate-img"
              />
            ) : (
              <img
                src={defaultCertifictate}
                alt="Certificate"
                className="certificate-img default-certificate"
              />
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default VerificationCard;
