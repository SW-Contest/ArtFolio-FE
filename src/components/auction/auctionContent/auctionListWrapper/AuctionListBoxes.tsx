import React from "react";
import AuctionListBox from "../AuctionListBox";
import { AuctionList, AuctionPage } from "../../../../types/auction.type";

interface AuctionListBoxesProps {
  pages?: AuctionPage[];
  list?: AuctionList[];
}

const AuctionListBoxes = (props: AuctionListBoxesProps) => {
  const { pages, list } = props;

  // pages는 useInfiniteQuery로 받아온 데이터입니다.
  // 기본 경매 데이터는 pages를 통해 처리됩니다.
  if (pages) {
    return (
      <>
        {pages.map((list) =>
          list.data.map((item) => (
            <AuctionListBox
              key={item.auctionInfo.id}
              artistInfo={item.artistInfo}
              auctionInfo={item.auctionInfo}
            />
          ))
        )}
      </>
    );
  }

  // list는 useQuery로 받아온 검색 결과 데이터입니다.
  // 검색 결과 데이터는 list를 통해 처리됩니다.
  if (list) {
    return (
      <>
        {list.map((item) => (
          <AuctionListBox
            key={item.auctionInfo.id}
            artistInfo={item.artistInfo}
            auctionInfo={item.auctionInfo}
          />
        ))}
      </>
    );
  }

  return <></>;
};

export default AuctionListBoxes;
