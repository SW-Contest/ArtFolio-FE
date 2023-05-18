// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import SlideImage from "./SlideImage";

interface DetailCarouselProps {
  photoPaths: string[];
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
        className="detailSwiper mt-10"
      >
        {props.photoPaths.length > 0 ? (
          props.photoPaths.map((photo, index) => (
            <SwiperSlide key={index}>
              <img className="flex shrink-0 w-full h-80" src={photo} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-black">이미지가 없습니다</p>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default DetailCarousel;
