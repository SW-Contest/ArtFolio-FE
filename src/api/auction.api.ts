import axios from "axios";
import { HOST } from "../constants/host";

export const getAuctionPage = async (pageParam: number) => {
  const response = await axios.get(
    `http://${HOST}/rt_auction/list?page=${pageParam}&size=10&sort=auctionLike,DESC`
  );

  return response;
};

export const getAuctionDetail = async (auctionId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/rt_auction/${auctionId}`);

  return response;
};

export const postAuctionLike = async (auctionId: string, memberId: number) => {
  const response = await axios.post(`http://${HOST}/rt_auction/like`, {
    auctionId: auctionId,
    memberId: memberId,
  });

  return response;
};
