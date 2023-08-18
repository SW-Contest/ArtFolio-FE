import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../../src/assets/searchIcon.svg";

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
      className="relative flex items-center justify-center w-full h-20 p-3 shrink-0 bg-af-darkGray"
    >
      <input
        type="text"
        value={searchText}
        onChange={changeTextHandler}
        placeholder="관심있는 작가나 작품을 검색해보세요."
        className="w-full p-2 pl-3 pr-8 rounded-2xl"
      ></input>
      <button className="absolute  right-5 w-5 h-5">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
