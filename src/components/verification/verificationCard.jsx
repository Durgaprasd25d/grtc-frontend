import React, { useState } from "react";
import { Box, Button, TextField, Container, Typography } from "@mui/material";
import { student } from "../../dummydata.js";
import "./VerificationCard.css";

const VerificationCard = () => {
  const {
    name,
    registrationNo,
    dob,
    dateOfAdmission,
    fatherName,
    courses,
    profilePic,
    certficatePic,
  } = student;

  const [submitted, setSubmitted] = useState(false); // State to control visibility of boxes

  const handleSubmit = () => {
    setSubmitted(true); // Set submitted to true when submit button is clicked
  };

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
        />
        <Button
        style={{marginLeft:'5px',backgroundColor:'#1eb2a6'}}
          variant="contained"
          className="verification-submit-button"
          onClick={handleSubmit} // Call handleSubmit function when submit button is clicked
        >
          Submit
        </Button>
      </Box>
      {submitted && ( // Display boxes if submitted is true
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
                src={profilePic}
                alt="Profile Pic"
                className="profile-pic-img"
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Name: {name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Registration No: {registrationNo}
            </Typography>
            <Typography variant="h6" gutterBottom>
              DOB: {dob}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Date of Admission: {dateOfAdmission}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Father's Name: {fatherName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Courses: {courses}
            </Typography>
          </Box>
          <Box
            className="verification-right-box"
            p={2}
            boxShadow={3}
            borderRadius={2}
            bgcolor="background.paper"
          >
            <img
              src={certficatePic}
              alt="Certificate"
              className="certificate-img"
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default VerificationCard;
