export interface ListBoxProps {
  auctionId: number;
  like?: number;
  artist: string;
  title: string;
  currentPrice: number;
  tumbnailPath?: string;
}

export const dummyItems: ListBoxProps[] = [
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
