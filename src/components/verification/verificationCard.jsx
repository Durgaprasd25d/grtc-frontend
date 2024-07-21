import React, { useState, useEffect, useRef } from "react";
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
