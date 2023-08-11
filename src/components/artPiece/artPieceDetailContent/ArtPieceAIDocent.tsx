import { ArtPieceInfo } from "../../../types/artPiece.type";
import ArtPieceAIDocentModal from "./ArtPieceAIDocentModal";
import { useEffect, useState } from "react";
import { HiSpeakerphone } from "react-icons/hi";

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
        className="fixed w-20 h-20 bottom-8 right-5 btn btn-circle"
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
