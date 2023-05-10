import create from "zustand";

interface ListState {
  pageNumber: number;
  increasePageNumber: () => void;
}
const useListStore = create<ListState>((set) => ({
  pageNumber: 0,
  increasePageNumber: () =>
    set((state) => ({ pageNumber: state.pageNumber + 1 })),
}));

export default useListStore;
