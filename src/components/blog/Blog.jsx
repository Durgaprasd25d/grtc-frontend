import React from "react";
import Back from "../common/back/Back";
import { Grid, Typography, Paper, Box } from "@mui/material"; // Import necessary components from Material-UI

const Blog = () => {
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
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Placeholder"
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
            <Typography variant="body1" style={{padding:'2px'}} sx={{ flexGrow: 1, maxHeight: 400, overflow: 'auto', textAlign: 'justify' }}>
              {/* Justified text with reduced height and scrolling */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat... volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat... volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat... volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat... volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, lacus a lobortis feugiat, nisi tortor fringilla elit, at imperdiet ipsum lacus in nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;
