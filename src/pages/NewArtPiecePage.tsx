import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postNewArtPiece, uploadArtPieceImage } from "../api/artPiece.api";
import { BsFillImageFill } from "react-icons/bs";
import { userId } from "../mocks/dummyUser";
import DetailCarousel from "../components/detail/detailContent/DetailCarousel";
import { useAnimationStore } from "../store/store";

const NewArtPiecePage = () => {
  const { showAnimation, hideAnimation } = useAnimationStore();
  const navigate = useNavigate();
  const [artPieceTitle, setArtPieceTitle] = useState("");
  const [artPieceContent, setArtPieceContent] = useState("");
  const [artPieceFile, setArtPieceFile] = useState<FileList | null>(null);
  const [artPieceImages, setArtPieceImages] = useState<string[]>([]);

  useEffect(() => {
    if (artPieceFile) {
      [...artPieceFile].forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setArtPieceImages((prev) => [...prev, String(reader.result)]);
        };
      });
    }
  }, [artPieceFile]);

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtPieceTitle(e.target.value);
  };

  const onContentChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setArtPieceContent(e.target.value);
  };

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArtPieceFile(e.target.files);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    showAnimation("loading");

    if (artPieceFile) {
      try {
        const response = await postNewArtPiece({
          title: artPieceTitle,
          content: artPieceContent,
          artistId: userId,
        });

        const artPieceId = response.data;
        try {
          await uploadArtPieceImage({
            artistId: userId,
            artPieceId: artPieceId,
            files: artPieceFile,
          });
          navigate(-1);
        } catch (e) {
          console.log("이미지 업로드 중 오류 발생");
        } finally {
          hideAnimation();
        }
      } catch (e) {
        console.log("작품 등록 중 오류 발생");
      }
    }
  };
  return (
    <Layout>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col mt-10 items-center gap-4 mb-10"
      >
        <div>
          <h1 className="text-2xl font-bold">새로운 작품 등록하기</h1>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">작품명</span>
          </label>
          <input
            type="text"
            value={artPieceTitle}
            onChange={onTitleChangeHandler}
            placeholder="작품명을 입력해주세요"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">작품 내용</span>
          </label>
          <textarea
            value={artPieceContent}
            onChange={onContentChangeHandler}
            className="textarea textarea-bordered h-24"
            placeholder="작품 내용을 입력해주세요"
            required
          ></textarea>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">파일을 선택해주세요</span>
          </label>
          <input
            multiple
            onChange={onFileChangeHandler}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs"
            required
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">미리보기</span>
          </label>
          {artPieceImages.length > 0 ? (
            <DetailCarousel photoPaths={artPieceImages} />
          ) : (
            <div className="w-full h-[300px] bg-slate-200 flex justify-center items-center">
              <BsFillImageFill size={24} />
            </div>
          )}
        </div>

        <button className="btn">등록하기</button>
      </form>
    </Layout>
  );
};

export default NewArtPiecePage;
