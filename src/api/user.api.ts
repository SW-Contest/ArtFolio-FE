import axios from "axios";
import { HOST } from "../constants/host";

export const getUserFollowList = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/follow/${userId}`);

  return response.data;
};

export const toggleUserFollow = async (body: {
  fromUserId: number;
  toUserId: number;
}) => {
  const response = await axios.post(`http://${HOST}/follow`, body);

  return response.data;
};

export const getUserInfo = async (userId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/user/${userId}`);

  return response;
};
