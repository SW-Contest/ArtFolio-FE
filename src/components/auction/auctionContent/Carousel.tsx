// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  const slidesSrc = [
    "/img/banner/001.png",
    "/img/banner/002.png",
    "/img/banner/003.png",
  ];
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
        className="bannerSwiper"
      >
        {slidesSrc.map((src, index) => (
          <SwiperSlide key={index}>
            <img className="flex shrink-0 w-full " src={src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
