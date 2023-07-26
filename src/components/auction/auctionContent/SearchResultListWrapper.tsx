import AuctionListBoxes from "./auctionListWrapper/AuctionListBoxes";
import ListBoxSkeletonList from "../../ui/ListBoxSkeletonList";

interface SearchResultListWrapperProps {
  isFetching: boolean;
  data: any;
  isError: boolean;
  searchResult: any;
}
const SearchResultListWrapper = (props: SearchResultListWrapperProps) => {
  return (
    <section className="flex flex-col w-full p-3 font-Pretendard">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">검색 결과</p>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        {!props.isError && props.isFetching && <ListBoxSkeletonList />}
        {/* <AuctionListBoxes pages={pages} /> */}
      </div>
      {props.isError && <p>데이터 불러오기 오류.</p>}
      {!props.isError && !props.isFetching && !props.data && (
        <p>데이터가 없습니다.</p>
      )}
    </section>
  );
};

export default SearchResultListWrapper;
