import ListButton from "./ListButton";
import { useState } from "react";

const ListWrapper = () => {
  const [sort, setSort] = useState("전체"); // 전체,인기

  const changeSortHandler = (changeSort: string) => {
    console.log("클릭!");
    setSort(changeSort);
  };

  return (
    <section className="flex flex-col w-full p-3">
      <div className="flex gap-4">
        <ListButton sort={sort} name="전체" onClick={changeSortHandler}>
          전체
        </ListButton>
        <ListButton sort={sort} name="인기" onClick={changeSortHandler}>
          인기
        </ListButton>
      </div>
    </section>
  );
};

export default ListWrapper;
