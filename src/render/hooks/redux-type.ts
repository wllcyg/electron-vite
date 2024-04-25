import { useSelector,useDispatch } from 'react-redux'

import type { AppDispatch,RootState } from '@/render/store/index'
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()