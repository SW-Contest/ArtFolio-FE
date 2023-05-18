import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageModal = () => {
  // 모달이 있을 때는 외부 스크롤을 막습니다.
  const changeScrollHandler = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <label
          htmlFor="image-modal"
          className="rounded-xl p-3 hover:bg-gray-200 cursor-pointer"
        >
          전체보기 {">"}
        </label>
      </div>
      <input
        onChange={changeScrollHandler}
        type="checkbox"
        id="image-modal"
        className="modal-toggle"
      />
      <TransformWrapper>
        <label htmlFor="image-modal" className="cursor-pointer modal">
          <label className="modal-box w-[350px] h-[350px] relative flex items-center">
            <article className="p-4 ">
              <TransformComponent>
                <img src="/src/assets/img/cat.jpeg" />
              </TransformComponent>
            </article>
          </label>
        </label>
      </TransformWrapper>
    </>
  );
};

export default ImageModal;
