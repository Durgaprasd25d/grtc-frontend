import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import Back from "../common/back/Back";
import { gallery } from "../../dummydata";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const ImageGallery = () => {
  const classes = useStyles();


  return (
    <>
    <Back title='Gallery'/>
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Image Gallery
      </Typography>
      <Grid container spacing={3}>
        {gallery.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={image.url}
                  title={image.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {image.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Description of the image or additional information.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>

  );
};

export default ImageGallery;
