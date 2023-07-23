import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import { useState, useEffect } from "react";
import { postNewArtPiece } from "../api/artPiece.api";

const NewArtPiecePage = () => {
  const [artPieceTitle, setArtPieceTitle] = useState("");
  const [artPieceContent, setArtPieceContent] = useState("");
  const [artPieceFile, setArtPieceFile] = useState<File | null>(null);

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
      setArtPieceFile(e.target.files[0]);
    }
  };
  const onSubmitHandler = async () => {
    if (artPieceFile) {
      try {
        const response = await postNewArtPiece({
          title: artPieceTitle,
          content: artPieceContent,
          artistId: 1,
        });
      } catch (e) {}
    }
  };
  return (
    <Layout>
      <Header />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col mt-10 items-center gap-4"
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
            onChange={onFileChangeHandler}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            required
          />
        </div>

        <button className="btn">등록하기</button>
      </form>
    </Layout>
  );
};

export default NewArtPiecePage;
