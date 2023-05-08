// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import SlideImage from "./SlideImage";

interface DetailCarouselProps {
  photoPaths?: string[];
}
const DetailCarousel = (props: DetailCarouselProps) => {
  return (
    <>
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        className="detailSwiper"
      >
        {props.photoPaths?.map((photo, index) => (
          <SwiperSlide key={index}>
            <img
              className="flex shrink-0 object-contain w-full h-80"
              src={photo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DetailCarousel;
