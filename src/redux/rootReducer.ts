import { combineReducers } from '@reduxjs/toolkit'
import first from './slices/first.ts'

export const rootReducer = combineReducers({
	first
})
export type RootState = ReturnType<typeof rootReducer>