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

  const { artistInfo, artPieceInfo } = data ?? {};

  const fetchAIInfo = async () => {
    const response = await analyzeArtPiece({
      artPieceId: Number(artPieceId),
      question: `당신은 그림의 태그들을 보고 그림에 대하여 다른 사람에게 설명하는 역할을 맡았습니다.
      작품 설명은 "${artPieceInfo?.content}" 이며 작품 설명과 태그를 연관지어서 설명해주세요. 
      또한 그림에 대하여 실제로 보고 있는 것처럼 확신을 가지고 설명해주세요. 
      태그를 세밀하게 설명하지 말고 , 전체적인 부분을 설명해주세요.
      답변은 '이 작품은~' 으로 시작하며 500자 정도로 부드러운 어투로 설명해주세요.`,
    });
    console.log(response.data);
    return response.data;
  };

  const { data: AIData, isFetching: AIIsFetching } = useQuery<AiInfo>(
    ["AIInfo" + artPieceId],
    fetchAIInfo,
    {
      enabled: !!artPieceInfo,
    }
  );

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
