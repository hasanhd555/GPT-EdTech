import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
// to access the Redux store
//UseDispatch is a hook that returns the dispatch function from the Redux store
//UseSelector is a hook that returns the state from the Redux store
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;