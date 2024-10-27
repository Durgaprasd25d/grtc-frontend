import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: "100%",
    position: "relative",
  },
  media: {
    height: 250,
    // paddingTop: "75%", // 4:3 aspect ratio
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: theme.spacing(2),
  },
  modalImage: {
    maxWidth: "90%",
    maxHeight: "80vh",
    borderRadius: theme.shape.borderRadius,
  },
  prevButton: {
    position: "absolute",
    left: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    '&:hover': {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  nextButton: {
    position: "absolute",
    right: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    '&:hover': {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  backButton: {
    backgroundColor: "#1eb2a6",
    color: "white",
    margin: theme.spacing(1, 0, 2, 0),
  },
}));

export default useStyles;
