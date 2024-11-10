/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Container, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { connect } from 'react-redux';

const BannerSlider = (props) => {
  const [bannerSliderLists, setBannerSliderLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    setIsLoading(true);
    setBannerSliderLists(props.get_offer_banner_lists);
    setIsLoading(false);
  }, [props.get_offer_banner_lists]);

  // Slider settings, adjusted for single banner scenario
  const settings = {
    dots: false,
    infinite: bannerSliderLists.length > 1, // Only infinite loop if more than 1 banner
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: bannerSliderLists.length > 1, // Only autoplay if more than 1 banner
    autoplaySpeed: 5000,
    arrows: false,    
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 2, p: { xs: 0, sm: 0 } }}>
      <Slider {...settings}>
        {props.is_data_loading ? (
          // Show Skeleton loader while data is being fetched
          [...Array(3)].map((_, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: {
                    xs: 200, // Mobile
                    sm: 320, // Tablet
                    md: 400, // Desktop
                    lg: 500, // Large desktop
                  },
                  width: "100%",
                  margin: '0 auto',
                }}
              />
            </Box>
          ))
        ) : (
          // Show the actual banner images once data is fetched
          props.get_offer_banner_lists.map((item) => (
            <Box key={item.id} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                sx={{
                  height: {
                    xs: 200, // Mobile
                    sm: 320, // Tablet
                    md: 400, // Desktop
                    lg: 500, // Large desktop
                  },
                  width: "100%",
                  display: 'block',
                  margin: '0 auto',                
                }}
                src={ImagePathRoutes.BannerOfferPostImagePath + item.Imagepath}
                alt={item.Imagepath}
              />
            </Box>
          ))
        )}
      </Slider>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    is_data_loading: state.is_data_loading,
    get_offer_banner_lists: state.get_offer_banner_lists,
  };
};

export default connect(mapStateToProps, null)(BannerSlider);