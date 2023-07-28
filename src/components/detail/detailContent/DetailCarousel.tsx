// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import ImageModal from "./ImageModal";
import { SyntheticEvent, useState } from "react";
import { Pagination } from "swiper";

interface DetailCarouselProps {
  photoPaths: string[];
}
const DetailCarousel = (props: DetailCarouselProps) => {
  const [imgError, setImgError] = useState(props.photoPaths.length === 0);
  const [imgSrc, setImgSrc] = useState("");
  const clickImageHandler = (photo: string) => {
    const checkbox = document.getElementById("image-modal") as HTMLInputElement;
    if (checkbox) {
      setImgSrc(photo);
      checkbox.checked = true;
      document.body.style.overflow = "hidden";
    }
  };

  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
  };
  return (
    <>
      <Swiper
        spaceBetween={10}
        // centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={
          {
            // clickable: true,
          }
        }
        modules={[Pagination]}
        className="detailSwiper mt-10"
      >
        {!imgError ? (
          props.photoPaths.map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                onError={onErrorHandler}
                onClick={() => clickImageHandler(photo)}
                className="flex shrink-0 w-full h-80"
                src={photo}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-black">이미지가 없습니다</p>
          </SwiperSlide>
        )}
      </Swiper>
      <ImageModal imgSrc={imgSrc} />
    </>
  );
};

export default DetailCarousel;
