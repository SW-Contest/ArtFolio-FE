export interface auctionProps {
  auctionId: number;
  like: number;
  artist?: string;
  currentPrice: number;
  artPieceTitle: string;
  auctionTitle?: string;
  tumbnailPath?: string;
}

export interface auctionListProps {
  isLast: boolean;
  pageSize: number;
  pageNumber: number;
  dataSize: number;
  data: auctionProps[];
}

export interface auctionDetailProps {
  auctionId: number;
  artistId: number;
  artPieceId: number;
  artPieceTitle: string;
  auctionTitle: string;
  auctionContent: string;
  auctionStartPrice: number;
  auctionCurrentPrice: number;
  like: number;
  likeMembers: number[];
  photoPaths: string[];
}

export const dummyDetail: auctionDetailProps = {
  auctionId: 1,
  artistId: 1,
  artPieceId: 2,
  artPieceTitle: "테스트 작품 이름",
  auctionTitle: "테스트 경매 제목",
  auctionContent: "테스트 경매 내용",
  auctionStartPrice: 100000,
  auctionCurrentPrice: 150000,
  like: 3,
  likeMembers: [1, 3, 5],
  photoPaths: [
    "https://artfolio-bucket.s3.ap-northeast-2.amazonaws.com/static/2/20230503_005332.jpg",
    "https://artfolio-bucket.s3.ap-northeast-2.amazonaws.com/static/2/20230417_181536.jpg",
    "https://artfolio-bucket.s3.ap-northeast-2.amazonaws.com/static/2/2023-%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-1.png",
    "https://artfolio-bucket.s3.ap-northeast-2.amazonaws.com/static/2/20230417_181543.jpg",
  ],
};

export const dummyItems: auctionListProps = {
  isLast: false,
  pageSize: 10,
  pageNumber: 0,
  dataSize: 6,
  data: [
    {
      auctionId: 1,
      like: 0,
      artist: "Vincent van Gogh",
      artPieceTitle: "Starry Night",
      auctionTitle: "Starry Night",
      currentPrice: 5000,
      tumbnailPath: "",
    },
    {
      auctionId: 2,
      like: 0,
      artist: "Pablo Picasso",
      artPieceTitle: "Les Demoiselles d'Avignon",
      auctionTitle: "Picasso's Masterpiece",
      currentPrice: 7500,
      tumbnailPath: "",
    },
    {
      auctionId: 3,
      like: 0,
      artist: "Claude Monet",
      artPieceTitle: "Water Lilies",
      auctionTitle: "Impressionist Landscape",
      currentPrice: 3000,
      tumbnailPath: "",
    },
    {
      auctionId: 4,
      like: 0,
      artist: "Salvador Dali",
      artPieceTitle: "The Persistence of Memory",
      auctionTitle: "Surrealist Timepiece",
      currentPrice: 10000,
      tumbnailPath: "",
    },
    {
      auctionId: 5,
      like: 0,
      artist: "Edvard Munch",
      artPieceTitle: "The Scream",
      auctionTitle: "Expressionist Classic",
      currentPrice: 8000,
      tumbnailPath: "",
    },
    {
      auctionId: 6,
      like: 0,
      artist: "Leonardo da Vinci",
      artPieceTitle: "Mona Lisa",
      auctionTitle: "Renaissance Beauty",
      currentPrice: 12000,
      tumbnailPath: "",
    },
  ],
};

export const dummyItems2: auctionListProps = {
  isLast: true,
  pageSize: 10,
  pageNumber: 1,
  dataSize: 6,
  data: [
    {
      auctionId: 1,
      like: 0,
      artist: "Vincent van Gogh",
      artPieceTitle: "Starry Night",
      auctionTitle: "Starry Night",
      currentPrice: 5000,
      tumbnailPath: "",
    },
    {
      auctionId: 2,
      like: 0,
      artist: "Pablo Picasso",
      artPieceTitle: "Les Demoiselles d'Avignon",
      auctionTitle: "Picasso's Masterpiece",
      currentPrice: 7500,
      tumbnailPath: "",
    },
    {
      auctionId: 3,
      like: 0,
      artist: "Claude Monet",
      artPieceTitle: "Water Lilies",
      auctionTitle: "Impressionist Landscape",
      currentPrice: 3000,
      tumbnailPath: "",
    },
    {
      auctionId: 4,
      like: 0,
      artist: "Salvador Dali",
      artPieceTitle: "The Persistence of Memory",
      auctionTitle: "Surrealist Timepiece",
      currentPrice: 10000,
      tumbnailPath: "",
    },
    {
      auctionId: 5,
      like: 0,
      artist: "Edvard Munch",
      artPieceTitle: "The Scream",
      auctionTitle: "Expressionist Classic",
      currentPrice: 8000,
      tumbnailPath: "",
    },
    {
      auctionId: 6,
      like: 0,
      artist: "Leonardo da Vinci",
      artPieceTitle: "Mona Lisa",
      auctionTitle: "Renaissance Beauty",
      currentPrice: 12000,
      tumbnailPath: "",
    },
  ],
};
