import { ArtPieceInfo } from "./artPiece.type";
import { AiInfo } from "./ai.type";

export interface AuctionList {
  artistInfo: ArtistInfo;
  auctionInfo: AuctionInfo;
  artPieceInfo?: ArtPieceInfo;
}

export interface AuctionPage {
  hasNext: boolean;
  isLast: boolean;
  pageSize: number;
  pageNumber: number;
  dataSize: number;
  data: AuctionList[];
}

export interface ArtistInfo {
  id: number;
  username?: string;
  name: string;
  email: string;
  photoPath: string;
  content?: string;
  like?: number;
}

export interface AuctionInfo {
  id: string;
  title: string;
  content: string;
  startPrice: number;
  currentPrice: number;
  like: number;
  createdAt: string;
  finishedAt: string;
  photoPaths: string[];
  // thumbnailPath: string;
  likeMembers: number[];
}

export interface BidderInfos {
  id: number;
  name: string;
  email: string;
  photoPath: string;
  like: number;
  bidPrice: number;
  bidDate: string;
}

export interface AuctionDetail {
  artistInfo: ArtistInfo;
  auctionInfo: AuctionInfo;
  artPieceInfo: ArtPieceInfo;
  bidderInfos: BidderInfos[];
  aiInfo: AiInfo;
}

export interface AuctionLikedMember {
  size: number;
  likeUsers: ArtistInfo[];
}
