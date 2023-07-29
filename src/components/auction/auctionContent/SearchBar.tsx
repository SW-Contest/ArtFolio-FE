import { useState } from "react";
import { AuctionList } from "../../../types/auction.type";

interface SearchBarProps {
  changeSearchQuery: (searchText: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");

  const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchTextHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.changeSearchQuery(searchText);
  };

  return (
    <form
      onSubmit={searchTextHandler}
      className="relative flex shrink-0 items-center justify-center w-full p-3 h-20 bg-af-darkGray font-Pretendard"
    >
      <input
        type="text"
        value={searchText}
        onChange={changeTextHandler}
        placeholder="관심있는 작가나 작품을 검색해보세요."
        className="w-full rounded-2xl p-2 pr-8"
      ></input>
      <button className="right-5 absolute">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
