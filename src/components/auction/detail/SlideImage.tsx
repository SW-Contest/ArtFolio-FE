import React from "react";
import { SwiperSlide } from "swiper/react";
import { useState } from "react";

interface SlideImageProps {
  photo: string;
}

const SlideImage = (props: SlideImageProps) => {
  console.log(props.photo);
  const [isLoading, setIsLoading] = useState(true);
  return <></>;
};

export default SlideImage;
