import { ArtPieceInfo } from "../../../types/artPiece.type";

interface ArtPieceTitleProps {
  artPieceInfo: ArtPieceInfo;
}

const ArtPieceTitle = (props: ArtPieceTitleProps) => {
  return (
    <article className="flex justify-between w-full py-2">
      <h2 className="text-xl font-bold ">{props.artPieceInfo.title}</h2>
    </article>
  );
};

export default ArtPieceTitle;
