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
  scrollY: number;
  onTransition: boolean;
  recentPage: string;
  setScrollY: (scrollY: number) => void;
  transitionForward: () => void;
  transitionBackward: () => void;
  changeOnTransition: (onTransition: boolean) => void;
  setRecentPage: (recentPage: string) => void;
}

interface ScrollState {}

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
  scrollY: 0,
  from: 0,
  to: 0,
  onTransition: false,
  recentPage: "/",
  setScrollY: (scrollY: number) => set((state) => ({ scrollY: scrollY })),
  transitionForward: () => set((state) => ({ from: 1, to: -1 })),
  transitionBackward: () => set((state) => ({ from: -1, to: 1 })),
  changeOnTransition: (onTransition: boolean) => {
    console.log("onTransition", onTransition);
    set((state) => ({ onTransition: onTransition }));
    setTimeout(() => {
      console.log("onTransition", "false");
      set((state) => ({ onTransition: false }));
    }, 1100);
  },
  setRecentPage: (recentPage: string) =>
    set((state) => ({ recentPage: recentPage })),
}));
