import { useQuery } from "@tanstack/react-query";
import { analyzeArtPiece } from "../../../api/artPiece.api";
import { useTransitionStore } from "../../../store/store";
import { AIInfo } from "../../../types/ai.type";
import { ArtPieceInfo } from "../../../types/artPiece.type";
import ArtPieceAIDescription from "./ArtPieceAIDescription";
import ArtPieceAiDocent from "./ArtPieceAIDocent";
import ArtPieceLabelChart from "./ArtPieceLabelChart";

interface ArtPieceAIContentProps {
  artPieceInfo: ArtPieceInfo;
}
const ArtPieceAIContent = ({ artPieceInfo }: ArtPieceAIContentProps) => {
  const { onTransition } = useTransitionStore();

  const artPieceId = artPieceInfo.id;

  const fetchAIInfo = async () => {
    const response = await analyzeArtPiece({
      artPieceId: Number(artPieceId),
      question: `당신은 그림의 태그들을 보고 그림에 대하여 다른 사람에게 설명하는 역할을 맡았습니다.
      작품 설명은 "${artPieceInfo?.content}" 이며 작품 설명과 태그를 연관지어서 설명해주세요. 
      또한 그림에 대하여 실제로 보고 있는 것처럼 확신을 가지고 설명해주세요. 
      태그를 세밀하게 설명하지 말고 , 전체적인 부분을 설명해주세요.
      답변은 '이 작품은~' 으로 시작하며 500자 정도로 부드러운 어투로 설명해주세요.`,
    });
    return response.data;
  };

  const { data: AIData, isFetched: AIIsFetched } = useQuery<AIInfo>(
    ["AIInfo" + artPieceId],
    fetchAIInfo,
    {
      enabled: !!artPieceInfo,
    }
  );

  const { labels, voice, content: AIContent } = AIData ?? {};

  return (
    <section className="flex flex-col">
      {AIData && labels && voice && AIContent && (
        <>
          <ArtPieceLabelChart labels={labels} />
          {/* <ArtPieceLabelWrapper labels={labels} /> */}
          <ArtPieceAIDescription content={AIContent} />
          {!onTransition && (
            <ArtPieceAiDocent
              artPieceInfo={artPieceInfo}
              content={AIContent}
              voice={voice}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ArtPieceAIContent;
