import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Scrollbar } from "react-scrollbars-custom";
import { bidderDataProps } from "./BidList";

interface DetailModalProps {
  bidderData: bidderDataProps[];
}
const DetailModal = (props: DetailModalProps) => {
  // 모달이 있을 때는 외부 스크롤을 막습니다.
  const chnageScrollHandler = (e: any) => {
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
        <motion.label
          htmlFor="auction-modal"
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl p-3 hover:bg-gray-200 cursor-pointer"
        >
          전체보기 {">"}
        </motion.label>
      </div>
      <input
        onChange={chnageScrollHandler}
        type="checkbox"
        id="auction-modal"
        className="modal-toggle"
      />
      <label htmlFor="auction-modal" className="cursor-pointer modal">
        <label className="modal-box w-[350px] h-[350px] relative flex items-center">
          <Scrollbar style={{ width: 350 }}>
            <article className="p-4 ">
              <p className="mb-2 text-sm font-semibold">경매 내역</p>
              <div className="flex justify-between py-1 border-b">
                <p className="w-1/2 text-xs font-light text-left">입찰자</p>
                <p className="w-1/2 text-xs font-light text-right">입찰가</p>
              </div>
              {props.bidderData.map((bidInfo, index) => (
                <div key={index} className="flex justify-between py-1">
                  <p className="w-1/2 text-xs font-light text-left">
                    {bidInfo.name}
                  </p>
                  <p className="w-1/2 text-xs font-light text-right">
                    {bidInfo.y}원
                  </p>
                </div>
              ))}
            </article>
          </Scrollbar>
        </label>
      </label>
    </>
  );
};

export default DetailModal;
