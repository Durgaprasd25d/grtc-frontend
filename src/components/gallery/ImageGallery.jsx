import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { gallery } from "../../dummydata";
import useStyles from "./styles";
import Back from "../common/back/Back";

const ImageGallery = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const categorizedImages = gallery.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = [];
    }
    acc[image.category].push(image);
    return acc;
  }, {});

  return (
    <>
      <Back title="Gallery" />
      <Container className={classes.container} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Image Gallery
        </Typography>
        {selectedCategory ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              {selectedCategory}
            </Typography>
            <Button
              style={{
                backgroundColor: "#1eb2a6",
                color: "white",
                margin: "5px 5px 5px 0",
              }}
              onClick={handleBackClick}
            >
              Back
            </Button>

            <Grid container spacing={3}>
              {categorizedImages[selectedCategory].map((image) => (
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
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Grid container spacing={3}>
            {Object.keys(categorizedImages).map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category}>
                <Card
                  className={classes.card}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CardActionArea>
                    <CardContent className={classes.folderCard}>
                      <FolderIcon className={classes.folderIcon} />
                      <Typography gutterBottom variant="h5" component="h2">
                        {category}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ImageGallery;
