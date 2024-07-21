import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Back from "../common/back/Back";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1eb2a6",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    };

    // Wait for CSS transitions to complete before scrolling
    setTimeout(handleScroll, 300); // Adjust timing as per your CSS transition duration
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://grtc-new-node-backend.onrender.com/api/students/login",
        {
          registrationNo,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "studentData",
        JSON.stringify(response.data.student)
      );
      alert("Login Success");
      setLoading(false);
      history.push("/exam-list");
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
        alert(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Back title="Student Login" />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" ref={mainContentRef}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="registrationNo"
                    label="Registration No"
                    name="registrationNo"
                    autoComplete="registrationNo"
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              {loading ? (
                <CircularProgress style={{ margin: "20px 20px 20px 180px", color: "#1eb2a6" }} />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
              )}
            </form>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
