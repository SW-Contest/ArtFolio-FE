import { create } from "zustand";

interface AnimationState {
  type: string; // 애니메이션의 종류를 나타냅니다. (heart,loading,success)
  isShow: boolean; // 애니메이션이 보여지는지 안보여지는지 여부입니다. (true: 보여짐, false: 안보여짐)
  showAnimation: (type: string) => void;
  hideAnimation: () => void;
}

interface TransitionState {
  from: number; // 트랜지션의 방향을 나타냅니다. 1: forward, -1: backward
  to: number; // 트랜지션의 방향을 나타냅니다. -1: forward, 1: backward
  onTransition: boolean; // 트랜지션이 진행중인지 여부입니다. (true: 진행중, false: 진행중이 아님)
  recentPage: string; // 최근에 방문한 페이지의 url을 저장합니다.
  transitionForward: () => void;
  transitionBackward: () => void;
  toggleTransition: () => void;
  setRecentPage: (recentPage: string) => void;
}

interface userState {
  userId: number | null;
  setUserId: (userId: number) => void;
}

export const useUserStore = create<userState>((set) => ({
  userId: null,
  setUserId: (userId: number) => set((state) => ({ userId: userId })),
}));

export const useAnimationStore = create<AnimationState>((set) => ({
  type: "loading",
  isShow: false,
  showAnimation: (type: string) =>
    set((state) => ({ isShow: true, type: type })),
  hideAnimation: () => set((state) => ({ isShow: false })),
}));

export const useTransitionStore = create<TransitionState>((set) => ({
  from: 0,
  to: 0,
  onTransition: false,
  recentPage: "/",
  transitionForward: () => set((state) => ({ from: 1, to: -1 })),
  transitionBackward: () => set((state) => ({ from: -1, to: 1 })),
  toggleTransition: () => {
    // 트랜져션의 여부를 토글합니다. (true: 진행중, false: 진행중이 아님)
    // 또한 setTimeout을 통해 1.1초 후에 트랜지션 여부를 false로 바꿉니다.
    set((state) => ({ onTransition: true }));
    setTimeout(() => {
      set((state) => ({ onTransition: false }));
    }, 1100);
  },
  setRecentPage: (recentPage: string) =>
    set((state) => ({ recentPage: recentPage })),
}));
