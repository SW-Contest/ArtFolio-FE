import { ArtPieceInfo } from "../../../types/artPiece.type";
import { FcFlashOn } from "react-icons/fc";

interface ArtPieceAIDescriptionProps {
  content: string;
}

const ArtPieceAIDescription = (props: ArtPieceAIDescriptionProps) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center">
        <FcFlashOn size={24} />
        <h3 className="text-sm font-semibold ">AI의 작품 설명</h3>
      </div>
      <p className="w-full mb-1 text-sm font-normal ">{props.content}</p>
    </article>
  );
};

export default ArtPieceAIDescription;
