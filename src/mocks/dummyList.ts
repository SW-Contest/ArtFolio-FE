export interface auctionProps {
  auctionId: number;
  like: number;
  artist: string;
  currentPrice: number;
  artPieceTitle: string;
  auctionTitle: string;
  thumbnailPath: string;
}

export interface auctionListProps {
  isLast: boolean;
  pageSize: number;
  pageNumber: number;
  dataSize: number;
  data: auctionProps[];
}

export interface artistInfoProps {
  memberId: number;
  name: string;
  email: string;
  profilePhotoPath: string;
  like: number;
}

export interface auctionInfoProps {
  id: string;
  title: string;
  content: string;
  startPrice: number;
  currentPrice: number;
  like: number;
  createdAt: string;
  photoPaths: string[];
  likeMembers?: number[];
}

export interface bidInfosProps {
  id: number;
  name: string;
  email: string;
  photoPath: string;
  like: number;
  bidPrice: number;
  bidDate: string;
}

export interface auctionDetailProps {
  artistInfo: artistInfoProps;
  auctionInfo: auctionInfoProps;
  bidderInfos: bidInfosProps[];
}

// export const dummyDetail: auctionDetailProps = {
//   auctionId: 1,
//   artistId: 1,
//   artPieceId: 2,
//   artPieceTitle: "테스트 작품 이름",
//   auctionTitle: "테스트 경매 제목",
//   auctionContent: "테스트 경매 내용",
//   auctionStartPrice: 100000,
//   auctionCurrentPrice: 150000,
//   like: 3,
//   likeMembers: [1, 3, 5],
//   photoPaths: [],
// };

// export const dummyItems: auctionListProps = {
//   isLast: false,
//   pageSize: 10,
//   pageNumber: 0,
//   dataSize: 6,
//   data: [
//     {
//       auctionId: 1,
//       like: 0,
//       artist: "Vincent van Gogh",
//       artPieceTitle: "Starry Night",
//       auctionTitle: "Starry Night",
//       currentPrice: 5000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 2,
//       like: 0,
//       artist: "Pablo Picasso",
//       artPieceTitle: "Les Demoiselles d'Avignon",
//       auctionTitle: "Picasso's Masterpiece",
//       currentPrice: 7500,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 3,
//       like: 0,
//       artist: "Claude Monet",
//       artPieceTitle: "Water Lilies",
//       auctionTitle: "Impressionist Landscape",
//       currentPrice: 3000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 4,
//       like: 0,
//       artist: "Salvador Dali",
//       artPieceTitle: "The Persistence of Memory",
//       auctionTitle: "Surrealist Timepiece",
//       currentPrice: 10000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 5,
//       like: 0,
//       artist: "Edvard Munch",
//       artPieceTitle: "The Scream",
//       auctionTitle: "Expressionist Classic",
//       currentPrice: 8000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 6,
//       like: 0,
//       artist: "Leonardo da Vinci",
//       artPieceTitle: "Mona Lisa",
//       auctionTitle: "Renaissance Beauty",
//       currentPrice: 12000,
//       thumbnailPath: "",
//     },
//   ],
// };

// export const dummyItems2: auctionListProps = {
//   isLast: true,
//   pageSize: 10,
//   pageNumber: 1,
//   dataSize: 6,
//   data: [
//     {
//       auctionId: 1,
//       like: 0,
//       artist: "Vincent van Gogh",
//       artPieceTitle: "Starry Night",
//       auctionTitle: "Starry Night",
//       currentPrice: 5000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 2,
//       like: 0,
//       artist: "Pablo Picasso",
//       artPieceTitle: "Les Demoiselles d'Avignon",
//       auctionTitle: "Picasso's Masterpiece",
//       currentPrice: 7500,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 3,
//       like: 0,
//       artist: "Claude Monet",
//       artPieceTitle: "Water Lilies",
//       auctionTitle: "Impressionist Landscape",
//       currentPrice: 3000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 4,
//       like: 0,
//       artist: "Salvador Dali",
//       artPieceTitle: "The Persistence of Memory",
//       auctionTitle: "Surrealist Timepiece",
//       currentPrice: 10000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 5,
//       like: 0,
//       artist: "Edvard Munch",
//       artPieceTitle: "The Scream",
//       auctionTitle: "Expressionist Classic",
//       currentPrice: 8000,
//       thumbnailPath: "",
//     },
//     {
//       auctionId: 6,
//       like: 0,
//       artist: "Leonardo da Vinci",
//       artPieceTitle: "극단적으로 엄청나게 긴 제목 극단적으로 엄청나게 긴 제목",
//       auctionTitle: "극단적으로 엄청나게 긴 제목 극단적으로 엄청나게 긴 제목",
//       currentPrice: 12000,
//       thumbnailPath: "",
//     },
//   ],
// };
