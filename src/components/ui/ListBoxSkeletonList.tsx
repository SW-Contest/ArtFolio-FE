import ListBoxSkeleton from "./ListBoxSkeleton";

// 스켈레톤 이미지를 표시할 때 6개의 ListBoxSkeleton을 표시합니다.
const ListBoxSkeletonList = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <ListBoxSkeleton key={index} />
      ))}
    </>
  );
};

export default ListBoxSkeletonList;
