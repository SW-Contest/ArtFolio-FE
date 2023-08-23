import ArtPieceListBox from "../../artPiece/artPieceDetailContent/ArtPieceListBox";
import { ArtPieceDetail } from "../../../types/artPiece.type";

interface UserArtPieceListBoxesProps {
  id: string;
  list: ArtPieceDetail[];
}

const UserLikedArtPieceListBoxes = (props: UserArtPieceListBoxesProps) => {
  return (
    <>
      {props.list.map((artPiece) => (
        <ArtPieceListBox
          key={props.id + artPiece.artPieceInfo.id}
          artPieceInfo={artPiece.artPieceInfo}
          artistInfo={artPiece.artistInfo}
        />
      ))}
    </>
  );
};

export default UserLikedArtPieceListBoxes;
