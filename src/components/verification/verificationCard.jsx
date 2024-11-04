import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion"; // Importing from framer-motion
import defaultCertificate from "../../Images/default_certificate.avif";
import "./VerificationCard.css";
import gsap from "gsap"; // Importing GSAP for animations

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },
  notification: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
}));

const VerificationCard = () => {
  const classes = useStyles();
  const [studentData, setStudentData] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [smsNotification, setSmsNotification] = useState(""); 
  const mainContentRef = useRef(null);
  const searchInputRef = useRef(null);
  const notificationRef = useRef(null); // Ref for notification

  useEffect(() => {
    mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    // Animation for notifications
    if (errorMessage || smsNotification) {
      const tl = gsap.timeline();
      tl.to(notificationRef.current, { autoAlpha: 1, duration: 0.5 }) // Fade in
        .to(notificationRef.current, { autoAlpha: 0, duration: 0.5, delay: 5 }); // Fade out after 5 seconds
    }
  }, [errorMessage, smsNotification]);

  const handleSubmit = async () => {
    setSubmitted(true);
    setErrorMessage("");
    setSmsNotification(""); 
    setLoading(true); 
  
    try {
      const studentResponse = await fetch(
        `https://grtcindia.in/grtc-server/api/studentReg/${registrationNo}`
      );

      if (!studentResponse.ok) {
        if (studentResponse.status === 404) {
          const backupResponse = await fetch(
            `https://grtc-new-node-backend.onrender.com/api/students/${registrationNo}`
          );

          if (!backupResponse.ok) {
            setErrorMessage("No student available with this registration number");
            setStudentData(null);
            return; 
          }

          const backupData = await backupResponse.json();
          setStudentData(backupData);
        } else {
          return; 
        }
      } else {
        const fetchedStudentData = await studentResponse.json();
        setStudentData(fetchedStudentData.data);

        const examResponse = await fetch(
          `https://grtc-new-node-backend.onrender.com/api/students/${fetchedStudentData.data.registrationNo}`
        );

        if (!examResponse.ok) {
          setErrorMessage("No exam details available for this student");
          return; 
        }

        const examData = await examResponse.json();
        const completedExams = examData.completedExams || []; 

        if (completedExams.length === 0) {
          setSmsNotification("Student has not given any exams.");
        }

        setStudentData((prevData) => ({
          ...prevData,
          attendedExams: examData.attendedExams,
          completedExams: completedExams,
        }));
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
    <Container maxWidth="lg" className="verification-card-container" ref={mainContentRef}>
      <Box className="verification-search-section" display="flex" justifyContent="center" mb={3}>
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

      {/* Notification section */}
      <Box className={classes.notification} ref={notificationRef}>
        {submitted && errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
           <Typography
  variant="body1"
  gutterBottom
  sx={{
    backgroundColor: 'red', // Set the background color to red
    color: 'white', // Set the text color to white
    padding: 2, // Add some padding for better visual spacing
    borderRadius: 1, // Optional: add rounded corners
    boxShadow: 2, // Optional: add a slight shadow for a glossy effect
    textAlign: 'center' // Optional: center the text
  }}
>
  {errorMessage}
</Typography>

          </motion.div>
        )}

        {submitted && smsNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Typography variant="body1" color="warning" gutterBottom>
              {smsNotification}
            </Typography>
          </motion.div>
        )}
      </Box>

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
            <Box className="verification-profile-pic" display="flex" justifyContent="center" alignItems="center">
              <img src={studentData.profilePic} alt="Profile Pic" className="profile-pic-img" />
            </Box>
            <Box className="verification-details">
              <Box className="verification-field-row">
                <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                  Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.name}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                  Registration No:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.registrationNo}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                  DOB:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.dob}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                  Date of Admission:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.dateOfAdmission}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                  Father's Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {studentData.fatherName}
                </Typography>
              </Box>
              <Box className="verification-field-row">
                <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
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
              <img src={studentData.certificatePic} alt="Certificate" className="certificate-img" />
            ) : (
              <img src={defaultCertificate} alt="Certificate" className="certificate-img default-certificate" />
            )}
          </Box>
        </Box>
      )}
      {submitted && studentData && studentData.completedExams && (
        <Box className="verification-exam-info">
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
        </Box>
      )}
    </Container>
  );
};

export default VerificationCard;
