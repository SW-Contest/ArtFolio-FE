import AuctionListBoxes from "./auctionListWrapper/AuctionListBoxes";
import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";
import { AuctionList } from "../../../types/auction.type";

interface SearchResultListWrapperProps {
  isFetching: boolean;
  searchResult: AuctionList[];
  isError: boolean;
}
const SearchResultListWrapper = (props: SearchResultListWrapperProps) => {
  return (
    <section className="flex flex-col w-full p-3">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">검색 결과</p>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        {!props.isError && props.isFetching && <ListBoxSkeletonList />}
        <AuctionListBoxes id="auctionSearchResult" list={props.searchResult} />
      </div>
      {props.isError && <p>데이터 불러오기 오류.</p>}
      {!props.isError &&
        !props.isFetching &&
        props.searchResult.length === 0 && <p>검색 결과가 없습니다.</p>}
    </section>
  );
};

export default SearchResultListWrapper;
