import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageModalProps {
  imgSrc: string;
}

const ImageModal = (props: ImageModalProps) => {
  // 모달이 있을 때는 외부 스크롤을 막습니다.
  const changeScrollHandler = (e: any) => {
    const isChecked = e.target.value;
    console.log("in");
    if (isChecked) {
      document.body.style.overflow = "unset";
    }
  };
  return (
    <>
      <input
        onChange={changeScrollHandler}
        type="checkbox"
        id="image-modal"
        className="modal-toggle"
      />
      <TransformWrapper>
        <label htmlFor="image-modal" className="cursor-pointer modal">
          <label className="modal-box w-[350px] h-[350px] relative flex items-center justify-center">
            <TransformComponent>
              <img src={props.imgSrc} />
            </TransformComponent>
          </label>
        </label>
      </TransformWrapper>
    </>
  );
};

export default ImageModal;
