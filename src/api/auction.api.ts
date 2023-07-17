import axios from "axios";
import { HOST } from "../constants/host";

// Mock 경매 리스트를 받아옵니다.
export const getMockAuctionPage = async (pageParam: number) => {
  const dummyResponse = await axios.get(`/rt_auction/list/${pageParam}`);

  return dummyResponse;
};

export const getAuctionPage = async (pageParam: number) => {
  const response = await axios.get(
    `http://${HOST}/rt_auction/list?searchType=CURRENT_PRICE&orderType=DESC&page=${0}`
  );

  return response;
};

// Mock 경매 디테일을 받아옵니다.
export const getMockAuctionDetail = async (auctionId: string | undefined) => {
  const dummyResponse = await axios.get(`/rt_auction/1`);

  return dummyResponse;
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
