import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    maxWidth: "50%",
    maxHeight: "90%",
    marginRight:"45px"
  },
  prevButton: {
    position: "absolute",
    left: 0,
  },
  nextButton: {
    position: "absolute",
    right: "50px",
  },
  backButton: {
    backgroundColor: "#1eb2a6",
    color: "white",
    margin: "5px 5px 5px 0",
  },
}));

export default useStyles;
