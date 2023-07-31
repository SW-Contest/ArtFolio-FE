import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getArtPieceDetail } from "../../../api/artPiece.api";
import { useAnimationStore } from "../../../store/store";
import { ArtPieceDetail } from "../../../types/auction.type";
import ImageCarousel from "../../common/ImageCarousel";
import ArtistInfo from "../../common/user/ArtistInfo";

const ArtPieceDetailContent = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const artPieceId = useParams().artPieceId;

  const fetchArtPieceDetail = async () => {
    showAnimation("loading");
    const response = await getArtPieceDetail(artPieceId);
    console.log(response.data);
    return response.data;
  };

  const { data } = useQuery<ArtPieceDetail>(
    ["artPieceDetail" + artPieceId],
    fetchArtPieceDetail,
    {
      enabled: !!artPieceId,
      onSuccess: () => {
        hideAnimation();
      },
    }
  );

  const { artistInfo, artPieceInfo } = data ?? {};

  return (
    <section className="flex flex-col mt-10 mb-40 font-Pretendard">
      {data && artistInfo && artPieceInfo && (
        <>
          <ImageCarousel photoPaths={data.artPieceInfo.photoPaths ?? []} />
          <div className="p-2">
            <article className="flex justify-between w-full py-2 ">
              <p className="text-xl font-bold">{data.artPieceInfo.title}</p>
            </article>
            <ArtistInfo artistInfo={artistInfo} />
            <p className="mb-2 text-sm font-semibold ">작품 설명</p>
            <p className="w-full mb-1 text-sm font-normal ">
              {data.artPieceInfo.content}
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default ArtPieceDetailContent;
