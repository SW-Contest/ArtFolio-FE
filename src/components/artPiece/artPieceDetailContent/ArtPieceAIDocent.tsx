import { useEffect, useState } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { ArtPieceInfo } from "../../../types/artPiece.type";
import ArtPieceAIDocentModal from "./ArtPieceAIDocentModal";

interface ArtPieceAiDocentProps {
  artPieceInfo: ArtPieceInfo;
  content: string;
  voice: string;
}

const ArtPieceAiDocent = ({
  artPieceInfo,
  content,
  voice,
}: ArtPieceAiDocentProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const clickDocentHandler = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  useEffect(() => {
    const checkbox = document.getElementById(
      "docent-modal"
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
      document.body.style.overflow = "hidden";
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        className=" absolute w-16 h-16 right-5 btn btn-circle z-50 shadow-xl top-20"
        onClick={clickDocentHandler}
      >
        <HiSpeakerphone size={30} />
      </button>
      {isModalOpen && (
        <ArtPieceAIDocentModal
          artPieceInfo={artPieceInfo}
          content={content}
          voice={voice}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default ArtPieceAiDocent;
