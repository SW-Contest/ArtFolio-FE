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
