import React, { useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  makeStyles,
  Divider,
} from "@material-ui/core";
import Back from "../common/back/Back";
import { notices } from "../../dummydata";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const NoticeBoard = () => {
  const classes = useStyles();
  const lastNoticeRef = useRef(null);

  useEffect(() => {
    // Scroll to the last notice item on component mount
    lastNoticeRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Back title="Notice Board" />

      <Container className={classes.container} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Notice Board
        </Typography>
        <Divider />

        {notices.map((notice, index) => (
          <Paper
            key={notice.id}
            ref={index === notices.length - 1 ? lastNoticeRef : null}
            className={classes.paper}
            elevation={3}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" gutterBottom>
                  {notice.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" align="right">
                  Date: {notice.date}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </>
  );
};

export default NoticeBoard;
