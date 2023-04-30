import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RootState,AppDispatch } from "../../store/store";

type DispatchFunct = () => AppDispatch
export const useAppDispatch: DispatchFunct = useDispatch
export const useAppSelelector: TypedUseSelectorHook<RootState> = useSelector