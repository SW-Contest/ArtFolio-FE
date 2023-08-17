import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAuctionDetail } from "../../../api/auction.api";
import { useAnimationStore } from "../../../store/store";
import { AuctionDetail } from "../../../types/auction.type";
import ImageCarousel from "../../common/ImageCarousel";
import ArtistInfo from "../../common/user/ArtistInfo";
import AuctionDescription from "./AuctionDescription";
import AuctionTitle from "./AuctionTitle";
import BidList from "./BidList";
import ArtPieceTitle from "../../artPiece/artPieceDetailContent/ArtPieceTitle";
import ArtPieceDescription from "../../artPiece/artPieceDetailContent/ArtPieceDescription";
import ArtPieceAIContent from "../../artPiece/artPieceDetailContent/ArtPieceAIContent";

const AuctionDetailContent = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const auctionId = useParams().auctionId;

  const fetchAuctionDetail = async () => {
    showAnimation("loading");
    const response = await getAuctionDetail(auctionId);
    return response.data;
  };

  const { data, isFetching, refetch } = useQuery<AuctionDetail>(
    ["auctionDetail" + auctionId],
    fetchAuctionDetail,
    {
      onSuccess: () => {
        hideAnimation();
      },
    }
  );

  const { artistInfo, auctionInfo, bidderInfos, artPieceInfo } = data ?? {};

  return (
    <section className="flex flex-col mt-10 mb-40">
      {data && artistInfo && auctionInfo && bidderInfos && artPieceInfo && (
        <>
          <ImageCarousel photoPaths={auctionInfo.photoPaths ?? []} />
          <div className="flex flex-col gap-2 p-2">
            <AuctionTitle auctionInfo={auctionInfo} />
            <ArtistInfo artistInfo={artistInfo} />
            <ArtPieceTitle artPieceInfo={artPieceInfo} />
            <ArtPieceDescription artPieceInfo={artPieceInfo} />
            <AuctionDescription auctionInfo={auctionInfo} />
            <ArtPieceAIContent  artPieceInfo={artPieceInfo} />
            <BidList auctionInfo={auctionInfo} bidderInfos={bidderInfos} />
          </div>
        </>
      )}
    </section>
  );
};

export default AuctionDetailContent;
