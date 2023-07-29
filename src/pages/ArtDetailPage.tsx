import React, { useEffect, useState } from "react";
import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import { ArtPieceInfo, ArtistDetailInfo } from "../types/auction.type";
import { getArtPieceDetail } from "../api/artPiece.api";
import ArtistInfo from "../components/detail/detailContent/ArtistInfo";
import DetailCarousel from "../components/detail/detailContent/DetailCarousel";
import ArtDetailContent from "../components/detail/detailContent/ArtDetailContent";

const ArtDetailPage = () => {
  const [artPieceInfo, setArtPieceInfo] = useState<ArtPieceInfo | null>(null);
  const [artistDetailInfo, setArtistDetailInfo] =
    useState<ArtistDetailInfo | null>(null);

  return (
    <Layout>
      <Header />
      <div className="mt-10"></div>
      <ArtDetailContent />
    </Layout>
  );
};

/* AuctionContent랑 AuntionTitle을 ArtPieceContent, ArtPieceTitle로
사용 가능할듯? 작가정보는 artistInfo로 표시 해 줄 수 있따.
Detailcarousel도 공통으로 사용할 수 있을 것 같음! */

export default ArtDetailPage;
