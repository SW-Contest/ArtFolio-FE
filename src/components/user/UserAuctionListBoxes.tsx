import React from "react";
import ListBox from "../ui/ListBox";
import { AuctionList } from "../../types/auction.type";

interface UserAuctionListBoxes {
  pages: AuctionList[];
}

const UserAuctionListBoxes = (props: UserAuctionListBoxes) => {
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

export default UserAuctionListBoxes;
