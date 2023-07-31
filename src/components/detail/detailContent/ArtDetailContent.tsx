import React, { useEffect, useState } from "react";
import DetailCarousel from "./DetailCarousel";
import { useActionData, useParams } from "react-router-dom";
import { getArtPieceDetail } from "../../../api/artPiece.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArtPieceInfo } from "../../../types/auction.type";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useAnimationStore } from "../../../store/store";
import ArtistInfo from "./ArtistInfo";

const ArtDetailContent = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const { artPieceId } = useParams();

  const fetchArtPieceDetail = async () => {
    if (!artPieceId) {
      console.log("불러오기 오류");
      // artpieceId가 없으면 아무것도 하지 않음
      return null;
    }

    showAnimation("loading");
    const response = await getArtPieceDetail(Number(artPieceId));
    console.log(response.data);
    return response.data;
  };

  const { data, isFetching } = useQuery<ArtPieceInfo>(
    [artPieceId],
    fetchArtPieceDetail,
    {
      onSuccess: (response) => {
        hideAnimation();
        // 데이터를 성공적으로 받아온 경우, 여기서 response를 사용하거나 처리할 수 있음
        console.log(response);
      },
    }
  );

  if (isFetching || !data || !data.artPieceInfo) {
    // 로딩 중이거나 데이터가 없거나 artPieceInfo가 없을 경우 로딩 스피너를 출력
    return <LoadingSpinner />;
  }

  return (
    <section className="flex flex-col mb-40 font-Pretendard">
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        data && (
          <>
            <DetailCarousel photoPaths={data.artPieceInfo.photoPaths ?? []} />
            <div className="p-2">
              <article className="flex justify-between w-full py-2 ">
                <p className="text-xl font-bold">{data.artPieceInfo.title}</p>
              </article>
              <ArtistInfo artistInfo={ArtistInfo} />
              <p className="mb-2 text-sm font-semibold ">작품 설명</p>
              <p className="w-full mb-1 text-sm font-normal ">
                {data.artPieceInfo.content}{" "}
              </p>
            </div>
          </>
        )
      )}
    </section>
  );
};

export default ArtDetailContent;
