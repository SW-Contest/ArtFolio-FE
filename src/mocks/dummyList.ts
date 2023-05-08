export interface auctionListProps {
  auctionId: number;
  like?: number;
  artist: string;
  title: string;
  currentPrice: number;
  tumbnailPath?: string;
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

export const dummyDetail: auctionDetailProps[] = [
  {
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
  },
];

export const dummyItems: auctionListProps[] = [
  {
    auctionId: 1,
    artist: "Vincent van Gogh",
    title: "Starry Night",
    currentPrice: 5000,
  },
  {
    auctionId: 2,
    artist: "Pablo Picasso",
    title: "Les Demoiselles d'Avignon",
    currentPrice: 7000,
  },
  {
    auctionId: 3,
    artist: "Leonardo da Vinci",
    title: "Mona Lisa",
    currentPrice: 10000,
  },
  {
    auctionId: 4,
    artist: "Claude Monet",
    title: "Water Lilies",
    currentPrice: 3000,
  },
  {
    auctionId: 5,
    artist: "Edvard Munch",
    title: "The Scream",
    currentPrice: 8000,
  },
  {
    auctionId: 6,
    artist: "Salvador Dali",
    title: "The Persistence of Memory",
    currentPrice: 9000,
  },
  {
    auctionId: 7,
    artist: "Michelangelo",
    title: "David",
    currentPrice: 12000,
  },
  {
    auctionId: 8,
    artist: "Rembrandt",
    title: "Night Watch",
    currentPrice: 6000,
  },
  {
    auctionId: 9,
    artist: "Gustav Klimt",
    title: "The Kiss",
    currentPrice: 4000,
  },
  {
    auctionId: 10,
    artist: "Henri Matisse",
    title: "Dance",
    currentPrice: 2500,
  },
];
