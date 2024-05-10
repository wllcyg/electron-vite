import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'
interface ThemeObj {
  themKey: 'darkAlgorithm' | 'lightAlgorithm'
}
const initialState: ThemeObj = {
  themKey: 'lightAlgorithm',
}
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (status, { payload }) => {
      status.themKey = payload;
    }
  }
})
export const themeValue = (state: RootState) => state.theme
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer