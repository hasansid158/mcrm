import { Box } from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Carousal1 from 'common/Images/HomeCarousal/CarousalImage1.jpeg'
import Carousal2 from 'common/Images/HomeCarousal/CarousalImage2.jpeg'
import styles from '../index.module.scss';
import PublicContainer from 'common/Container';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const ImageCarousal = () => {
  return (
    <div>
      <PublicContainer>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          className="HomeCarousal"
        >
          <Box
            // width={{ xs: '100%', sm: '680px', md: '980px', lg: '1240px', xl: '1480px' }}
            width={'100%'}
            sx={{ position: 'relative', borderRadius: '30px' }}
          >
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              autoPlay={true}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024
                  },
                  items: 1,
                  partialVisibilityGutter: 40
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                  autoPlay: true
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                  autoPlay: true
                }
              }}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              // shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              <div className={styles.carousal}>
                <img sx={{ borderRadius: '30px' }} className={styles.carousalImage} src={Carousal2} alt="dashboard" />
              </div>
              <div className={styles.carousal}>
                <img sx={{ borderRadius: '30px' }} className={styles.carousalImage} src={Carousal2} alt="dashboard" />
              </div>
              <div className={styles.carousal}>
                <img sx={{ borderRadius: '30px' }} className={styles.carousalImage} src={Carousal2} alt="dashboard" />
              </div>
              <div className={styles.carousal}>
                <img sx={{ borderRadius: '30px' }} className={styles.carousalImage} src={Carousal2} alt="dashboard" />
              </div>


            </Carousel>
          </Box>
        </Box>
      </PublicContainer>
    </div>
  )
}

export default ImageCarousal