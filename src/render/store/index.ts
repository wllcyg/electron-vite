import { configureStore } from '@reduxjs/toolkit'
import counterReduce from '@/render/store/counter/Slice';
import themeReduce from '@/render/store/theme/Slice';
export default configureStore({
  reducer:{
    counter:counterReduce,
    theme:themeReduce,
  }
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type RootState = ReturnType<typeof configureStore.getState>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type AppDispatch = typeof configureStore.dispatch