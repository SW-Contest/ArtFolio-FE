import ArtPieceListBox from "../../artPiece/artPieceDetailContent/ArtPieceListBox";
import { ArtPieceList } from "../../../types/artPiece.type";

interface UserArtPieceListBoxesProps {
  id: string;
  list: ArtPieceList;
}

const UserArtPieceListBoxes = (props: UserArtPieceListBoxesProps) => {
  const { artPieceInfos, artistInfo } = props.list;
  return (
    <>
      {artPieceInfos.map((artPieceInfo) => (
        <ArtPieceListBox
          key={props.id + artPieceInfo.id}
          artPieceInfo={artPieceInfo}
          artistInfo={artistInfo}
        />
      ))}
    </>
  );
};

export default UserArtPieceListBoxes;
