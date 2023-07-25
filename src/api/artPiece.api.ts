import axios from "axios";
import { HOST } from "../constants/host";

export const getArtPieceList = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/user/art_piece/${userId}`);

  return response;
};

export const getLikedArtPieceList = async (userId: string | undefined) => {
  const response = await axios.get(
    `http://${HOST}/user/art_piece/like/${userId}`
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

// 작품에 이미지를 업로드합니다.
export const uploadArtPieceImage = async (body: {
  artistId: number;
  artPieceId: number;
  files: File;
}) => {
  const formData = new FormData();
  formData.append("artistId", body.artistId.toString());
  formData.append("artPieceId", body.artPieceId.toString());
  formData.append("files", body.files);
  const response = await axios.post(
    `http://${HOST}/art_piece/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response;
};
