export interface Auction {
  artistInfo: ArtistInfo;
  auctionInfo: AuctionInfo;
}

export interface AuctionList {
  hasNext: boolean;
  isLast: boolean;
  pageSize: number;
  pageNumber: number;
  dataSize: number;
  data: Auction[];
}

export interface ArtistInfo {
  memberId: number;
  name: string;
  email: string;
  profilePhotoPath: string;
  like: number;
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
  thumbnailPath: string;
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
  bidderInfos: BidderInfos[];
}
