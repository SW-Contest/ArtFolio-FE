// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Slide from "../../ui/Slide";

const Carousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        // centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        className="bannerSwiper mt-10"
      >
        <SwiperSlide>
          <Slide />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
