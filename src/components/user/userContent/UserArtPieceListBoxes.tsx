import React from "react";
import ListBox from "../../ui/ListBox";
import ListBoxSkeleton from "../../ui/ListBoxSkeleton";
import ArtPieceListBox from "../../ui/ArtPieceListBox";
import { ArtPieceList } from "../../../types/auction.type";

interface UserArtPieceListBoxesProps {
  list: ArtPieceList;
}

const UserArtPieceListBoxes = (props: UserArtPieceListBoxesProps) => {
  const { artPieceInfos, artistInfo } = props.list;
  return (
    <>
      {artPieceInfos.map((artPieceInfo) => (
        <ArtPieceListBox
          key={artPieceInfo.id}
          artPieceInfo={artPieceInfo}
          artistInfo={artistInfo}
        />
      ))}
    </>
  );
};

export default UserArtPieceListBoxes;
