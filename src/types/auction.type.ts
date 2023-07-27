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
  memberId: number;
  name: string;
  email: string;
  profilePhotoPath: string;
  like: number;
}

export interface ArtPieceInfo {
  id: number;
  title: string;
  content: string;
  likes: number;
  photoPaths: string[];
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

export interface AiInfo {
  labels: AiInfoLabel[];
  content: string;
}

export interface AiInfoLabel {
  name: string;
  confidence: number;
}

export interface AuctionDetail {
  artistInfo: ArtistInfo;
  auctionInfo: AuctionInfo;
  artPieceInfo: ArtPieceInfo;
  bidderInfos: BidderInfos[];
  aiInfo: AiInfo;
}

export interface ArtPieceList {
  artistInfo: ArtistInfo;
  artPieceInfos: ArtPieceInfo[];
}
