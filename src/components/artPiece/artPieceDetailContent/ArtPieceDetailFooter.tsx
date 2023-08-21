import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import {
  getArtPieceDetail,
  getArtPieceLikedMember,
  toggleArtpieceLike,
} from "../../../api/artPiece.api";
import {
  useAnimationStore,
  useUserStore,
  useTransitionStore,
} from "../../../store/store";

import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  ArtPieceDetail,
  ArtPieceLikedMember,
} from "../../../types/artPiece.type";
import AnimateNumber from "../../common/AnimateNumber";

const ArtPieceDetailFooter = () => {
  const location = useLocation();
  const { onTransition } = useTransitionStore();
  const { showAnimation, hideAnimation, isShow } = useAnimationStore();
  const [artPieceId, setArtPieceId] = useState(location.pathname.split("/")[2]);
  const [isLike, setIsLike] = useState(false);
  const { userId } = useUserStore();

  const fetchArtPieceDetail = async () => {
    const response = await getArtPieceDetail(artPieceId);
    return response.data;
  };

  const { data: artPieceData } = useQuery<ArtPieceDetail>(
    ["artPieceDetail" + artPieceId],
    fetchArtPieceDetail,
    {
      enabled: !!artPieceId,
    }
  );

  // 작품을 좋아요 한 유저 정보를 가져옵니다.
  const fetchArtPieceLikedMemeber = async () => {
    const response = await getArtPieceLikedMember(artPieceId);
    return response.data;
  };

  // 작품을 좋아요 한 유저 정보를 관리하는 쿼리
  const { data: artPieceLikeMemberData, refetch: artPieceLikeMemberRefetch } =
    useQuery<ArtPieceLikedMember>(
      ["likeMember" + artPieceId],
      fetchArtPieceLikedMemeber,
      {
        enabled: !!artPieceId,
      }
    );

  const { artPieceInfo, artistInfo } = artPieceData ?? {};

  // 해당 작품이 접속한 유저의 작품인지 확인합니다.
  const isOwner = artistInfo?.id === userId;

  // 작품 좋아요 유저 정보를 가져오고 , 해당 경매가 좋아요 된 경매인지 확인합니다.
  useEffect(() => {
    if (artPieceLikeMemberData) {
      const likeMember = artPieceLikeMemberData.likeUsers.filter((user) => {
        if (user.id === userId) return user;
      });

      if (likeMember.length > 0) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }
  }, [artPieceLikeMemberData]);

  // 좋아오 버튼이 눌리면 애니메이션을 보여주고, 좋아요를 토글합니다.
  const clickHeartHandler = () => {
    if (!isShow) {
      if (!isLike) {
        showAnimation("heart");
      }
      mutate({
        artPieceId: String(artPieceInfo?.id),
        artistId: userId!,
      });
    }
  };

  const { data: likeData, mutate } = useMutation(toggleArtpieceLike, {
    onSuccess: () => {
      artPieceLikeMemberRefetch();
    },
  });

  const artPieceLikeMemberLength = artPieceLikeMemberData?.likeUsers.length;

  if (!artPieceInfo) return <></>;

  if (isOwner) {
    return (
      <motion.footer
        initial={{
          y: "8rem",
        }}
        animate={{
          y: "1rem",
        }}
        transition={{ duration: 0.4 }}
        exit={{
          y: "8rem",
        }}
        className="fixed bottom-0 z-50 flex flex-col items-center justify-center w-full h-32 gap-4 shrink-0 bg-af-brightGray rounded-t-3xl "
      >
        <button
          className={
            "btn btn-outline w-60 flex justify-center items-center  bg-af-hotPink   border-af-hotPink hover:bg-af-hotPink hover:border-af-hotPink"
          }
        >
          <BsHeartFill size={14} className={"fill-white "} />
          <div className={twMerge(" h-7 text-lg font-semibold", "text-white")}>
            {artPieceLikeMemberLength}
          </div>
        </button>
      </motion.footer>
    );
  } else {
    return (
      <motion.footer
        initial={{
          y: "8rem",
        }}
        animate={{
          y: "1rem",
        }}
        transition={{ duration: 0.4 }}
        exit={{
          y: "8rem",
        }}
        className="fixed bottom-0 z-50 flex flex-col items-center justify-center w-full h-32 gap-4 shrink-0 bg-af-brightGray rounded-t-3xl "
      >
        <div className="flex items-center gap-2">
          <button
            onClick={clickHeartHandler}
            className={
              isLike
                ? "btn btn-outline w-60 flex justify-center items-center  bg-af-hotPink   border-af-hotPink hover:bg-af-hotPink hover:border-af-hotPink"
                : "btn btn-outline w-60 flex justify-center items-center  bg-transparent  border-af-hotPink hover:bg-transparent hover:border-af-hotPink"
            }
          >
            <BsHeartFill
              size={14}
              className={isLike ? "fill-white " : "fill-af-hotPink "}
            />
            <div
              className={twMerge(
                " h-7 text-lg font-semibold",
                isLike ? "text-white" : "text-af-hotPink"
              )}
            >
              {artPieceLikeMemberLength}
            </div>
          </button>
          {/* <div className="flex gap-1">
            <p className="h-8 text-2xl font-semibold text-center text-black">
              이 작품을
            </p>
            <div className="h-8 text-2xl font-semibold text-center text-af-hotPink">
              {artPieceLikeMemberLength && (
                <AnimateNumber count={artPieceLikeMemberLength} />
              )}
            </div>
            <p className="h-6 text-2xl font-semibold text-center text-black">
              명이 좋아합니다.
            </p>
          </div> */}
        </div>
      </motion.footer>
    );
  }
};

export default ArtPieceDetailFooter;
