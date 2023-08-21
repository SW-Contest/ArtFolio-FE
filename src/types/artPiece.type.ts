import ArtistInfo from "../components/common/user/ArtistInfo";

export interface ArtPieceInfo {
  id: number;
  title: string;
  content: string;
  likes: number;
  photoPaths: string[];
}

export interface ArtPieceDetail {
  artistInfo: ArtistInfo;
  artPieceInfo: ArtPieceInfo;
}

export interface ArtPieceList {
  artistInfo: ArtistInfo;
  artPieceInfos: ArtPieceInfo[];
}

export interface ArtPieceLikedMember {
  size: number;
  likeUsers: ArtistInfo[];
}
