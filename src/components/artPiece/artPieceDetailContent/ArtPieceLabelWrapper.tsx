import ArtPieceLabel from "./ArtPieceLabel";
import { AIInfoLabel } from "../../../types/ai.type";
import { FcFlashOn } from "react-icons/fc";

interface ArtPieceLabelWrapperProps {
  labels: AIInfoLabel[];
}
const ArtPieceLabelWrapper = (props: ArtPieceLabelWrapperProps) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center">
        <FcFlashOn size={24} />
        <h3 className="text-sm font-semibold ">AI가 분석한 작품 태그</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {props.labels.map((label, index) => (
          <ArtPieceLabel key={label.name} index={index}>
            {label.name}
          </ArtPieceLabel>
        ))}
      </div>
    </article>
  );
};

export default ArtPieceLabelWrapper;
