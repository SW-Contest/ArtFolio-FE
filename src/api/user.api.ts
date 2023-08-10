import axios from "axios";
import { HOST } from "../constants/host";

export const getUserFollowerList = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/user/follower/${userId}`);

  return response;
};

export const getUserInfo = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/user/${userId}`);

  return response;
};
