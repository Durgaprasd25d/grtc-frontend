import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  card: {
    maxWidth: 345,
    cursor: "pointer",
  },
  media: {
    height: 140,
  },
  folderCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 140,
  },
  folderIcon: {
    fontSize: 50,
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
