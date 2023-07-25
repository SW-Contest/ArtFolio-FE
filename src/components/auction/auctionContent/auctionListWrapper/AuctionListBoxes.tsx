import React from "react";
import ListBox from "../../../ui/ListBox";
import { AuctionList } from "../../../../types/auction.type";

interface AuctionListBoxesProps {
  pages: AuctionList[];
}

const AuctionListBoxes = (props: AuctionListBoxesProps) => {
  const { pages } = props;

  return (
    <>
      {pages.map((list) =>
        list.data.map((item) => (
          <ListBox
            key={item.auctionInfo.id}
            artistInfo={item.artistInfo}
            auctionInfo={item.auctionInfo}
          />
        ))
      )}
    </>
  );
};

export default AuctionListBoxes;
