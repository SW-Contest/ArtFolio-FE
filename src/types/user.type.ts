import { ArtistInfo } from "./auction.type";

export interface UserFollowList {
  userId: number;
  followerInfos: ArtistInfo[];
  followingInfos: ArtistInfo[];
}
