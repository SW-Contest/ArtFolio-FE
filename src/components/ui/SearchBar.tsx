import React from "react";

const SearchBar = () => {
  return (
    <section className="relative flex items-center justify-center w-full p-3 h-20 bg-af-darkGray">
      <div className=" left-5 absolute pointer-events-none">
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
      </div>
      <input
        placeholder="관심있는 작가나 작품을 검색해보세요."
        className="w-full rounded-xl p-2 pl-8 font-Pretendard"
      ></input>
    </section>
  );
};

export default SearchBar;
