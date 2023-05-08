import ListButton from "./ListButton";
import ListBox from "./ListBox";
import { useState } from "react";
import { ListBoxProps } from "./ListBox";

export const dummyItems: ListBoxProps[] = [
  {
    id: 1,
    artist: "Vincent van Gogh",
    title: "Starry Night",
    curPrice: 5000,
    timeLeft: new Date("2023-04-05T03:24:00"),
  },
  {
    id: 2,
    artist: "Pablo Picasso",
    title: "Les Demoiselles d'Avignon",
    curPrice: 7000,
    timeLeft: new Date("2023-04-04T10:00:00"),
  },
  {
    id: 3,
    artist: "Leonardo da Vinci",
    title: "Mona Lisa",
    curPrice: 10000,
    timeLeft: new Date("2023-04-05T16:30:00"),
  },
  {
    id: 4,
    artist: "Claude Monet",
    title: "Water Lilies",
    curPrice: 3000,
    timeLeft: new Date("2023-04-06T09:45:00"),
  },
  {
    id: 5,
    artist: "Edvard Munch",
    title: "The Scream",
    curPrice: 8000,
    timeLeft: new Date("2023-04-05T21:15:00"),
  },
  {
    id: 6,
    artist: "Salvador Dali",
    title: "The Persistence of Memory",
    curPrice: 9000,
    timeLeft: new Date("2023-04-04T12:00:00"),
  },
  {
    id: 7,
    artist: "Michelangelo",
    title: "David",
    curPrice: 12000,
    timeLeft: new Date("2023-04-06T18:00:00"),
  },
  {
    id: 8,
    artist: "Rembrandt",
    title: "Night Watch",
    curPrice: 6000,
    timeLeft: new Date("2023-04-07T08:30:00"),
  },
  {
    id: 9,
    artist: "Gustav Klimt",
    title: "The Kiss",
    curPrice: 4000,
    timeLeft: new Date("2023-04-05T14:45:00"),
  },
  {
    id: 10,
    artist: "Henri Matisse",
    title: "Dance",
    curPrice: 2500,
    timeLeft: new Date("2023-04-07T19:30:00"),
  },
];

const ListWrapper = () => {
  const [sort, setSort] = useState("전체"); // 전체,인기

  const changeSortHandler = (changeSort: string) => {
    setSort(changeSort);
  };

  return (
    <section className="flex flex-col w-full p-3">
      <div className="flex gap-4 mb-3">
        <p className=" font-Pretendard font-semibold">
          아트폴리오에서 경매 중인 작품
        </p>
        {/* <ListButton sort={sort} name="전체" onClick={changeSortHandler}>
          전체
        </ListButton>
        <ListButton sort={sort} name="인기" onClick={changeSortHandler}>
          인기
        </ListButton> */}
      </div>
      <div className="flex w-full flex-wrap justify-between">
        {dummyItems.map((item, index) => (
          <ListBox key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ListWrapper;
