import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Modal,
} from "@material-ui/core";
import { gallery } from "../../dummydata";
import useStyles from "./styles";
import Back from "../common/back/Back";
import CustomPagination from "../pagination/Paginations";

const itemsPerPage = 6;

const ImageGallery = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory, currentPage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex < paginatedImages.length - 1 ? prevIndex + 1 : 0;
      console.log(`Navigating to next image: ${newIndex}`);
      return newIndex;
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : paginatedImages.length - 1;
      console.log(`Navigating to previous image: ${newIndex}`);
      return newIndex;
    });
  };

  const categorizedImages = gallery.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = [];
    }
    acc[image.category].push(image);
    return acc;
  }, {});

  const paginatedImages = selectedCategory
    ? categorizedImages[selectedCategory].slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const totalPages = selectedCategory
    ? Math.ceil(categorizedImages[selectedCategory].length / itemsPerPage)
    : 1;

  return (
    <>
      <Back title="Gallery" />
      <Container className={classes.container} maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Image Gallery
        </Typography>
        {selectedCategory ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              {selectedCategory}
            </Typography>
            <Button
              className={classes.backButton}
              onClick={handleBackClick}
            >
              Back
            </Button>

            <Grid container spacing={3}>
              {paginatedImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Card
                    className={classes.card}
                    onClick={() => handleImageClick(index)}
                  >
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

            {paginatedImages.length > 0 && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <Grid container spacing={3} ref={galleryRef}>
            {Object.keys(categorizedImages).map((category) => {
              const coverImage = categorizedImages[category][0]?.coverImage;
              return (
                <Grid item xs={12} sm={6} md={4} key={category}>
                  <Card
                    className={classes.card}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={coverImage || "defaultCoverImage.jpg"}
                        title={category}
                        component="img"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {category}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          className={classes.modal}
        >
          <div className={classes.modalContent}>
            <Button className={classes.prevButton} onClick={handlePrevImage}>Left</Button>

            <img
              src={paginatedImages[currentImageIndex]?.url}
              alt="Selected"
              className={classes.modalImage}
            />

            <Button className={classes.nextButton} onClick={handleNextImage}>Right</Button>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default ImageGallery;
