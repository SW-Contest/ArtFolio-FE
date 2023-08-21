import { ArtPieceInfo } from "../../../types/artPiece.type";
import ImageCarousel from "../../common/ImageCarousel";
import ArtPieceAISubtitle from "./ArtPieceAISubtitle";
import { useEffect } from "react";

interface ArtPieceAIDocentModalProps {
  artPieceInfo: ArtPieceInfo;
  content: string;
  voice: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const ArtPieceAIDocentModal = ({
  artPieceInfo,
  content,
  voice,
  setIsModalOpen,
}: ArtPieceAIDocentModalProps) => {
  // 모달이 있을 때는 외부 스크롤을 막습니다.
  const changeScrollHandler = (e: any) => {
    setIsModalOpen(false);
    const isChecked = e.target.value;
    if (isChecked) {
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    let audio = document.getElementById("audio") as HTMLAudioElement;
    audio.play();
  }, []);

  return (
    <>
      <input
        onChange={changeScrollHandler}
        type="checkbox"
        id="docent-modal"
        className="modal-toggle"
      />

      {
        <label htmlFor="docent-modal" className="cursor-pointer modal px-2 ">
          <label className="relative flex flex-col items-center justify-center w-full max-w-[400px]  h-screen modal-box">
            <ImageCarousel
              disableClick
              photoPaths={artPieceInfo.photoPaths ?? []}
            />
            <audio autoPlay id="audio">
              <source src={voice} />
            </audio>
            <ArtPieceAISubtitle content={content} />
            <div onClick={changeScrollHandler} className="btn w-20">
              닫기
            </div>
          </label>
        </label>
      }
    </>
  );
};

export default ArtPieceAIDocentModal;
