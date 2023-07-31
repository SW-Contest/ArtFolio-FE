import { ArtPieceInfo } from "../../../types/artPiece.type";

interface ArtPieceDescriptionProps {
  artPieceInfo: ArtPieceInfo;
}
const ArtPieceDescription = (props: ArtPieceDescriptionProps) => {
  return (
    <article>
      <h3 className="mb-2 text-sm font-semibold ">작품 설명</h3>
      <p className="w-full mb-1 text-sm font-normal ">
        {props.artPieceInfo.content}
      </p>
    </article>
  );
};

export default ArtPieceDescription;
