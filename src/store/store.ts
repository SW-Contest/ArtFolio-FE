import { create } from "zustand";

interface ListState {
  pageNumber: number;
  increasePageNumber: () => void;
}

interface AnimationState {
  isShow: boolean;
  showAnimation: () => void;
  hideAnimation: () => void;
}

export const useListStore = create<ListState>((set) => ({
  pageNumber: 0,
  increasePageNumber: () =>
    set((state) => ({ pageNumber: state.pageNumber + 1 })),
}));

export const useAnimationStore = create<AnimationState>((set) => ({
  isShow: false,
  showAnimation: () => set((state) => ({ isShow: true })),
  hideAnimation: () => set((state) => ({ isShow: false })),
}));
