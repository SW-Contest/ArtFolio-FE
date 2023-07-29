// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
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
