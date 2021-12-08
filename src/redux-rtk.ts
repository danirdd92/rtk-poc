import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { todosInitialState as initialState } from './dev-data';
import logger from 'redux-logger';

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		// mismatch between actionType and actionCreator payloads, need to "prepare" an object via prepare
		create: {
			reducer: (state, { payload }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>) => {
				state.push(payload);
			},
			prepare: ({ desc }: { desc: string }) => ({ payload: { id: uuid(), desc, isComplete: false } }),
		},
		edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
			const todo = state.find((todo) => todo.id === payload.id);
			if (!todo) return state;
			todo.desc = payload.desc;
		},
		toggle: (state, { payload }: PayloadAction<{ id: string; isComplete: boolean }>) => {
			const todo = state.find((todo) => todo.id === payload.id);
			if (!todo) return;
			todo.isComplete = payload.isComplete;
		},
		remove: (state, { payload }: PayloadAction<{ id: string }>) => {
			const indx = state.findIndex((todo) => todo.id === payload.id);
			if (indx === -1) return;
			state.splice(indx, 1);
		},
	},
});

const selectedTodoSlice = createSlice({
	name: 'selectedTodo',
	/* eslint-disable */
	initialState: '',
	reducers: {
		select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
	},
});

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {},
	extraReducers: {
		[todosSlice.actions.create.type]: (state) => state + 1,
		[todosSlice.actions.edit.type]: (state) => state + 1,
		[todosSlice.actions.toggle.type]: (state) => state + 1,
		[todosSlice.actions.remove.type]: (state) => state + 1,
	},
});

export const {
	create: createTodoActionCreator,
	edit: editTodoActionCreator,
	toggle: toggleTodoActionCreator,
	remove: deleteTodoActionCreator,
} = todosSlice.actions;
export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = {
	todos: todosSlice.reducer,
	selectedTodo: selectedTodoSlice.reducer,
	counter: counterSlice.reducer,
};

export default configureStore({ reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger) });
