import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { analyzeArtPiece, getArtPieceDetail } from "../../../api/artPiece.api";
import { useAnimationStore } from "../../../store/store";
import { ArtPieceDetail } from "../../../types/artPiece.type";
import ImageCarousel from "../../common/ImageCarousel";
import ArtistInfo from "../../common/user/ArtistInfo";
import RoundButton from "../../common/RoundButton";
import { FcFlashOn } from "react-icons/fc";
import { AiInfo } from "../../../types/ai.type";
import LoadingSpinner from "../../common/LoadingSpinner";
import ArtPieceDescription from "./ArtPieceDescription";

import ArtPieceTitle from "./ArtPieceTitle";

const ArtPieceDetailContent = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const artPieceId = useParams().artPieceId;

  const fetchArtPieceDetail = async () => {
    showAnimation("loading");
    const response = await getArtPieceDetail(artPieceId);
    console.log(response.data);
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

  const fetchAIInfo = async () => {
    const response = await analyzeArtPiece(artPieceId);
    console.log(response.data);
    return response.data;
  };

  const { data: AIData, isFetching: AIIsFetching } = useQuery<AiInfo>(
    ["AIInfo" + artPieceId],
    fetchAIInfo
  );

  const { artistInfo, artPieceInfo } = data ?? {};

  return (
    <section className="flex flex-col mt-10 mb-40 font-Pretendard">
      {data && artistInfo && artPieceInfo && (
        <>
          <ImageCarousel photoPaths={artPieceInfo.photoPaths ?? []} />
          <div className="flex flex-col gap-2 p-2">
            <ArtPieceTitle artPieceInfo={artPieceInfo} />
            <ArtistInfo artistInfo={artistInfo} />
            <ArtPieceDescription artPieceInfo={artPieceInfo} />
            <div className="flex justify-center w-full">
              {AIIsFetching ? (
                <RoundButton>
                  <p>AI 분석중...</p>
                  <LoadingSpinner small />
                </RoundButton>
              ) : (
                <RoundButton className="gap-0" onClick={fetchAIInfo}>
                  <FcFlashOn size={30} />
                  <p>AI를 통해 그림 분석하기</p>
                </RoundButton>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ArtPieceDetailContent;
