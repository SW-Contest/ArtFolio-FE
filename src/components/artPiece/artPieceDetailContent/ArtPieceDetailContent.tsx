import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { analyzeArtPiece, getArtPieceDetail } from "../../../api/artPiece.api";
import {
  useAnimationStore,
  useTransitionStore,
  useUserStore,
} from "../../../store/store";
import { AIInfo } from "../../../types/ai.type";
import { ArtPieceDetail } from "../../../types/artPiece.type";
import ImageCarousel from "../../common/ImageCarousel";
import LoadingSpinner from "../../common/LoadingSpinner";
import RoundButton from "../../common/RoundButton";
import ArtistInfo from "../../common/user/ArtistInfo";
import ArtPieceDescription from "./ArtPieceDescription";

import TransitionLink from "../../common/TransitionLink";
import ArtPieceAIContent from "./ArtPieceAIContent";
import ArtPieceTitle from "./ArtPieceTitle";

const ArtPieceDetailContent = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const artPieceId = useParams().artPieceId;

  const { userId } = useUserStore();

  const fetchArtPieceDetail = async () => {
    showAnimation("loading");
    const response = await getArtPieceDetail(artPieceId);
    return response.data;
  };

  const { data } = useQuery<ArtPieceDetail>(
    ["artPieceDetail" + artPieceId],
    fetchArtPieceDetail,
    {
      enabled: !!artPieceId,
      onSuccess: () => {
        hideAnimation();
      },
    }
  );

  const { artistInfo, artPieceInfo } = data ?? {};

  // 접속한 유저와 해당 작품의 작가가 같은지 확인합니다.
  const isOwner = userId === artistInfo?.id;

  const fetchAIInfo = async () => {
    const response = await analyzeArtPiece({
      artPieceId: Number(artPieceId),
      question: `---
      description: ${artPieceInfo?.content}
      Task: Write a description from image label and description
      Topic: Art,Drawing
      Length: 2 paragraphs
      Format: Text
      Answer me in Korean
      Answer start with '이 작품은'
      ---
      Describe image figuratively to use labels from image.
      Do not mention about label's name`,
    });
    return response.data;
  };

  const { isFetched: AIIsFetched } = useQuery<AIInfo>(
    ["AIInfo" + artPieceId],
    fetchAIInfo,
    {
      enabled: !!artPieceInfo,
    }
  );

  return (
    <section className="relative flex flex-col mt-10 mb-60 font-Pretendard">
      {data && artistInfo && artPieceInfo && (
        <>
          <ImageCarousel photoPaths={artPieceInfo.photoPaths ?? []} />
          <div className="flex flex-col gap-2 p-2">
            <ArtPieceTitle artPieceInfo={artPieceInfo} />
            <ArtistInfo artistInfo={artistInfo} />
            <ArtPieceDescription artPieceInfo={artPieceInfo} />
            <ArtPieceAIContent artPieceInfo={artPieceInfo} />

            {isOwner && (
              <div className="flex justify-center w-full">
                {AIIsFetched ? (
                  <TransitionLink
                    to="/auction/new"
                    state={{ artPieceId: artPieceId }}
                  >
                    <RoundButton className="btn">
                      <p>경매 올리기</p>
                    </RoundButton>
                  </TransitionLink>
                ) : (
                  <RoundButton className="btn">
                    <p>AI 분석중...</p>
                    <LoadingSpinner small />
                  </RoundButton>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ArtPieceDetailContent;
