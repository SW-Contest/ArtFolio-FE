import React from "react";
import AuctionTitle from "./AuctionTitle";
import ArtistInfo from "./ArtistInfo";
import AuctionContent from "./AuctionContent";
import BidList from "./BidList";
import DetailCarousel from "./DetailCarousel";
import { useActionData, useParams } from "react-router-dom";
import {
  getAuctionDetail,
  getMockAuctionDetail,
} from "../../../api/auction.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuctionDetail } from "../../../types/auction.type";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useAnimationStore } from "../../../store/store";

const DetailContent = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const auctionId = useParams().auctionId;

  const fetchAuctionDetail = async () => {
    showAnimation("loading");
    const response = await getAuctionDetail(auctionId);
    return response.data;
  };

  const { data, isFetching, refetch } = useQuery<AuctionDetail>(
    [auctionId],
    fetchAuctionDetail,
    {
      onSuccess: () => {
        hideAnimation();
      },
    }
  );

  const { artistInfo, auctionInfo, bidderInfos } = data ?? {};

  return (
    <section className="flex flex-col mb-40  mt-10">
      {data && artistInfo && auctionInfo && bidderInfos && (
        <>
          <DetailCarousel photoPaths={auctionInfo.photoPaths ?? []} />
          <div className="p-2">
            <AuctionTitle auctionInfo={auctionInfo} />
            <ArtistInfo artistInfo={artistInfo} />
            <AuctionContent auctionInfo={auctionInfo} />
            <BidList auctionInfo={auctionInfo} bidderInfos={bidderInfos} />
          </div>
        </>
      )}
    </section>
  );
};

export default DetailContent;
