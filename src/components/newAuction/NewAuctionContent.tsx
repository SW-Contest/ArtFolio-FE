import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import {
  useAnimationStore,
  useTransitionStore,
  useUserStore,
} from "../../store/store";
import RoundButton from "../common/RoundButton";
import { postNewAuction } from "../../api/auction.api";

const NewAuctionContent = () => {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to="/" />;
  }
  const { userId } = useUserStore();
  const artPieceId = location.state.artPieceId;
  const navigate = useNavigate();
  const { toggleTransition, transitionBackward } = useTransitionStore();
  const { showAnimation, hideAnimation } = useAnimationStore();
  const [auctionTitle, setAuctionTitle] = useState("");
  const [auctionContent, setAuctionContent] = useState("");
  const [auctionPrice, setAuctionPrice] = useState(0);

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuctionTitle(e.target.value);
  };

  const onContentChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAuctionContent(e.target.value);
  };

  const onPriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuctionPrice(Number(e.target.value));
  };

  // 경매 등록 버튼을 누르면 경매 정보를 서버에 먼저 전송합니다.
  // 경매 정보를 서버에 전송하고 정상적으로 등록되면 응답으로 작품 id를 받아옵니다.
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    showAnimation("loading");

    console.log(auctionTitle, auctionContent, auctionPrice);
    if (userId) {
      try {
        const response = await postNewAuction({
          artistId: userId,
          artPieceId: Number(artPieceId),
          auctionTitle: auctionTitle,
          auctionContent: auctionContent,
          auctionStartPrice: auctionPrice,
        });

        showAnimation("success");
        toggleTransition();
        transitionBackward();
        navigate("/");
      } catch (e) {
        console.log("작품 등록 중 오류 발생");
        hideAnimation();
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col mt-10 items-center gap-4 mb-10"
    >
      <div>
        <h1 className="text-2xl font-bold">새로운 경매 등록하기</h1>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">경매 제목</span>
        </label>
        <input
          type="text"
          value={auctionTitle}
          onChange={onTitleChangeHandler}
          placeholder="경매 제목을 입력해주세요"
          className="input input-bordered w-full max-w-xs"
          required
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">경매 내용</span>
        </label>
        <textarea
          value={auctionContent}
          onChange={onContentChangeHandler}
          className="textarea textarea-bordered h-24"
          placeholder="경매 내용을 입력해주세요"
          required
        ></textarea>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">경매 시작가</span>
        </label>
        <input
          type="number"
          placeholder="경매 시작가를 입력해주세요"
          value={auctionPrice.toString().replace(/(^0+)/, "")}
          onChange={onPriceChangeHandler}
          className="input input-bordered h-12"
          required
        ></input>
      </div>

      <RoundButton>등록하기</RoundButton>
    </form>
  );
};

export default NewAuctionContent;
