import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'
interface CounterState {
  value: number
}
const initialState: CounterState = {
  value: 0
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers:{
    increment:state => {
      state.value += 1
    },
    decrement:state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})
export const selectCount = (state: RootState) => state.counter.value

export const { increment,decrement,incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer