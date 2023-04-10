// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        slidesPerView={1.2}
        loop={true}
        pagination={{
          clickable: true,
        }}
        className="bannerSwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
