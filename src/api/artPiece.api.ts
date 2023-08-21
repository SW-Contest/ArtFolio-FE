import axios from "axios";
import { HOST } from "../constants/host";

// 예술품 리스트를 받아옵니다.
export const getArtPieceList = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/user/art_piece/${userId}`);

  return response;
};

// 해당 유저가 좋아요한 예술품 리스트를 받아옵니다.
export const getLikedArtPieceList = async (userId: string | undefined) => {
  const response = await axios.get(
    `http://${HOST}/user/art_piece/like/${userId}`
  );

  return response;
};

// 해당 작품을 좋아요합니다.
export const toggleArtpieceLike = async (body: {
  artPieceId: string;
  artistId: number;
}) => {
  const response = await axios.patch(`http://${HOST}/art_piece/like`, body);

  return response;
};

// 해당 작품을 좋아요한 유저 목록을 받아옵니다.
export const getArtPieceLikedMember = async (artPieceId: string) => {
  const response = await axios.get(
    `http://${HOST}/art_piece/like/${artPieceId}`
  );
  return response;
};

// 새로운 작품을 등록합니다.
export const postNewArtPiece = async (body: {
  title: string;
  content: string;
  artistId: number;
}) => {
  const response = await axios.post(`http://${HOST}/art_piece`, body);

  return response;
};

// 작품을 삭제합니다.
export const deleteArtPiece = async (body: {
  artistId: number;
  artPieceId: number;
}) => {
  const response = await axios.delete(`http://${HOST}/art_piece`, {
    data: body,
  });

  return response;
};

// 작품에 이미지를 업로드합니다.
export const uploadArtPieceImage = async (body: {
  artistId: number;
  artPieceId: number;
  files: FileList;
}) => {
  const formData = new FormData();
  formData.append("artistId", body.artistId.toString());
  formData.append("artPieceId", body.artPieceId.toString());

  for (let i = 0; i < body.files.length; i++) {
    const file = body.files.item(i);
    if (file) {
      formData.append("files", file);
    }
  }

  const response = await axios.post(
    `http://${HOST}/art_piece/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response;
};

//예술품 상세정보 불러오기
export const getArtPieceDetail = async (artPieceId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/art_piece/${artPieceId}`);
  return response;
};

// 예술품을 AI를 통해 감정합니다.
export const analyzeArtPiece = async (body: {
  artPieceId: number;
  question: string | undefined;
}) => {
  const response = await axios.post(
    `http://${HOST}/art_piece/analyze/image`,
    body
  );
  return response;
};
