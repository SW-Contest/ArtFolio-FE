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
      artPieceContent: `${artPieceInfo?.content}`,
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
