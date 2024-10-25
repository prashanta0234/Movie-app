import { create } from "zustand";

interface ErrorState {
	isError: boolean;
	setIsError: (value: boolean) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
	isError: false,
	setIsError: (value: boolean) => set({ isError: value }),
}));
