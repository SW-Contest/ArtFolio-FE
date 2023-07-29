import axios from "axios";
import { HOST } from "../constants/host";

// 해당 유저의 얘술품 리스트를 받아옵니다.
export const getArtPieceList = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/user/art_piece/${userId}`);

  return response;
};

// 해당 유저가 좋아요한 얘술품 리스트를 받아옵니다.
export const getLikedArtPieceList = async (userId: string | undefined) => {
  const response = await axios.get(
    `http://${HOST}/user/art_piece/like/${userId}`
  );

  return response;
};

// 새로운 얘술품을 등록합니다.
export const postNewArtPiece = async (body: {
  title: string;
  content: string;
  artistId: number;
}) => {
  const response = await axios.post(`http://${HOST}/art_piece`, body);

  return response;
};

// 얘술품에 이미지를 업로드합니다.
export const uploadArtPieceImage = async (body: {
  artistId: number;
  artPieceId: number;
  files: FileList;
}) => {
  const formData = new FormData();
  formData.append("artistId", body.artistId.toString());
  formData.append("artPieceId", body.artPieceId.toString());

  // 파일이 여러개일 수 있으므로, for문을 돌면서 formData에 append합니다.
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

// 예술품을 삭제합니다.
export const deleteArtPiece = async (body: {
  artistId: number;
  artPieceId: number;
}) => {
  const response = await axios.delete(`http://${HOST}/art_piece`, {
    data: body,
  });

  return response;
};
