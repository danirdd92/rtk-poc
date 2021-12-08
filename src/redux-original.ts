import { v4 as uuid } from 'uuid';
import { Todo } from './type';
import { todosInitialState } from './dev-data';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// ACTION TYPE CONSTANTS {-1-}
const CREATE_TODO = 'CREATE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SELECT_TODO = 'SELECT_TODO';

// ACTION TYPES {-2-}
interface CreateTodoActionType {
	type: typeof CREATE_TODO;
	payload: Todo;
}

interface EditTodoActionType {
	type: typeof EDIT_TODO;
	payload: { id: string; desc: string };
}

interface ToggleTodoActionType {
	type: typeof TOGGLE_TODO;
	payload: { id: string; isComplete: boolean };
}

interface DeleteTodoActionType {
	type: typeof DELETE_TODO;
	payload: { id: string };
}

interface SelectTodoActionType {
	type: typeof SELECT_TODO;
	payload: { id: string };
}

// ActionType Union {-2.5-}
type TodoActionTypes = CreateTodoActionType | EditTodoActionType | ToggleTodoActionType | DeleteTodoActionType;

type SelectedTodoActionTypes = SelectTodoActionType;

// ACTION CREATORS {-3-}
export const createTodoActionCreator = (data: { desc: string }): CreateTodoActionType => {
	const { desc } = data;
	return {
		type: CREATE_TODO,
		payload: {
			id: uuid(),
			desc,
			isComplete: false,
		},
	};
};

export const editTodoActionCreator = (data: { id: string; desc: string }): EditTodoActionType => {
	const { id, desc } = data;

	return {
		type: EDIT_TODO,
		payload: { id, desc },
	};
};

export const toggleTodoActionCreator = (data: { id: string; isComplete: boolean }): ToggleTodoActionType => {
	const { id, isComplete } = data;

	return {
		type: TOGGLE_TODO,
		payload: { id, isComplete },
	};
};

export const deleteTodoActionCreator = (data: { id: string }): DeleteTodoActionType => {
	const { id } = data;
	return {
		type: DELETE_TODO,
		payload: { id },
	};
};

export const selectTodoActionCreator = (data: { id: string }): SelectTodoActionType => {
	const { id } = data;
	return {
		type: SELECT_TODO,
		payload: { id },
	};
};

// REDUCERS {-4-}
const todosReducer = (state: Todo[] = todosInitialState, action: TodoActionTypes) => {
	switch (action.type) {
		case CREATE_TODO: {
			return [...state, action.payload];
		}
		case EDIT_TODO: {
			const { payload } = action;
			return state.map((todo) => (todo.id === payload.id ? { ...todo, desc: payload.desc } : todo));
		}

		case TOGGLE_TODO: {
			const { payload } = action;
			return state.map((todo) => (todo.id === payload.id ? { ...todo, isComplete: payload.isComplete } : todo));
		}

		case DELETE_TODO: {
			const { payload } = action;
			return state.filter((todo) => todo.id !== payload.id);
		}

		default:
			return state;
	}
};

const selectedTodoReducer = (state: string | null = null, action: SelectedTodoActionTypes) => {
	switch (action.type) {
		case SELECT_TODO: {
			const { payload } = action;
			return payload.id;
		}
		default:
			return state;
	}
};

// share same Actiontypes because every dispatch will cascade through all reducers
const counterReducer = (state: number = 0, action: TodoActionTypes) => {
	switch (action.type) {
		case CREATE_TODO: {
			return state + 1;
		}
		case EDIT_TODO: {
			return state + 1;
		}

		case TOGGLE_TODO: {
			return state + 1;
		}

		case DELETE_TODO: {
			return state + 1;
		}

		default:
			return state;
	}
};

// COMBINE REDUCERS {-4.5-}

const reducers = combineReducers({
	todos: todosReducer,
	selectedTodo: selectedTodoReducer,
	counter: counterReducer,
});

// STORE WITH MIDDLEWARES {-5-}
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));
