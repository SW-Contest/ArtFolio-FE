import axios from "axios";
import { HOST } from "../constants/host";

// Mock 경매 리스트를 받아옵니다.
export const getMockAuctionList = async (pageParam: number) => {
  const dummyResponse = await axios.get(`/rt_auction/list/${pageParam}`);

  return dummyResponse;
};

// 진행중인 경매 리스트를 받아옵니다.
export const getAuctionList = async (pageParam: number) => {
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

// 해당 경매 디테일을 받아옵니다.
export const getAuctionDetail = async (auctionId: string | undefined) => {
  const response = await axios.get(`http://${HOST}/rt_auction/${auctionId}`);

  return response;
};

// 해당 경매를 좋아요합니다.
export const postAuctionLike = async (auctionId: string, userId: number) => {
  const response = await axios.patch(`http://${HOST}/rt_auction/like`, {
    auctionId: auctionId,
    userId: userId,
  });

  return response;
};

// 해당 유저가 낙찰받은 경매 리스트를 받아옵니다.
export const getFinishAuctionList = async (userId: string | undefined) => {
  const response = await axios.get(
    `http://${HOST}/user/auction/finish/${userId}`
  );

  return response;
};

// 해당 유저가 참여중인 경매 리스트를 받아옵니다.
export const getLiveAuctionList = async (userId: string | undefined) => {
  const response = await axios.get(
    `http://${HOST}/user/auction/live/${userId}`
  );

  return response;
};

// 해당 유저가 좋아요한 경매 리스트를 받아옵니다.
export const getLikedAuctionList = async (userId: string | undefined) => {
  const response = await axios.get(
    `http://${HOST}/user/auction/like/${userId}`
  );

  return response;
};

// 검색한 경매 결과를 받아옵니다.
export const getSearchResultList = async (keyword: string) => {
  const response = await axios.get(
    `http://${HOST}/rt_auction/search?keyword=${keyword}`
  );
  return response;
};
