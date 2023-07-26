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

interface TransitionState {
  from: number;
  to: number;
  transitionForward: () => void;
  transitionBackward: () => void;
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

export const useTransitionStore = create<TransitionState>((set) => ({
  from: 0,
  to: 0,
  transitionForward: () => set((state) => ({ from: 1, to: -1 })),
  transitionBackward: () => set((state) => ({ from: -1, to: 1 })),
}));
