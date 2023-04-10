// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const DetailCarousel = () => {
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
        <SwiperSlide>
          <img
            className="flex shrink-0 object-contain w-full h-80"
            src="/src/assets/img/penguin.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex shrink-0 object-contain w-full h-80"
            src="/src/assets/img/cat.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex shrink-0 object-contain w-full h-80"
            src="/src/assets/img/penguin.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex shrink-0 object-contain w-full h-80"
            src="/src/assets/img/cat.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex shrink-0 object-contain w-full h-80"
            src="/src/assets/img/penguin.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex shrink-0 object-contain w-full h-80"
            src="/src/assets/img/cat.jpeg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DetailCarousel;
