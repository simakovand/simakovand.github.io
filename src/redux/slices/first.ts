import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store'

// Define a type for the slice state
interface CounterState {
  value: number
  firstStore: string
}

// Define the initial state using that type
const initialState: CounterState = {
	value: 0,
	firstStore: 'zoloopa'
}

export const firstSlice = createSlice({
	name: 'first',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		increment: state => {
			state.value += 1
		},
		decrement: state => {
			state.value -= 1
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		}
	}
})

export const { increment, decrement, incrementByAmount } = firstSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.first.value

export default firstSlice.reducer