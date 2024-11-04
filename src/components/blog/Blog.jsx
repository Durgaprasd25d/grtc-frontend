import React, { useEffect, useRef } from "react";
import Back from "../common/back/Back";
import { Grid, Typography, Paper, Box } from "@mui/material"; // Import necessary components from Material-UI
import directorImg from "../../Images/director/director.jpg"
const Blog = () => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      textAreaRef.current.scrollIntoView({ behavior: "smooth" });
    };

    // Wait for CSS transitions to complete before scrolling
    setTimeout(handleScroll, 300); // Adjust timing as per your CSS transition duration
  }, []);

  return (
    <>
      {/* Header with title */}
      <Back title="Director's Message" />

      {/* Container for the two boxes */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {/* First box with image */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: 400 }}>
              {/* Image with reduced height */}
              <img
                src={directorImg}
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Second box with text */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Director's Message
            </Typography>
            <Typography variant="body1" style={{padding:'2px'}} sx={{ flexGrow: 1, maxHeight: 400, overflow: 'auto', textAlign: 'justify' }} ref={textAreaRef}>
              {/* Justified text with reduced height and scrolling */}
              Welcome to our Computer Institute. In today’s rapidly evolving technological landscape, we strive to provide quality education that empowers our students with the skills they need to succeed. Our commitment is to nurture innovation, creativity, and critical thinking. Together, we will embark on a journey of knowledge, transforming challenges into opportunities for personal and professional growth.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;
