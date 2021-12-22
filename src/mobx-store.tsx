import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { todosInitialState } from './dev-data';
import { Todo } from './type';

// MOBX Store contains all the state and actions of the store
// Can be either an object or a class
export const createTodoStore = () => {
	const todos: Todo[] = todosInitialState;
	return {
		todos,
		selectedTodoId: '',
		addTodo(input: string) {
			this.todos.push({
				id: uuid(),
				desc: input,
				isComplete: false,
			});
		},
		toggleTodo(id: string) {
			const todo = this.todos.find((todo) => todo.id === id);
			if (!todo) return;
			todo.isComplete = !todo.isComplete;
		},
		removeTodo(id: string) {
			const todos = this.todos.filter((todo) => todo.id !== id);
			this.todos = todos;
		},
		selectTodo(id: string) {
			const todo = this.todos.find((todo) => todo.id === id);
			if (!todo) return;
			this.selectedTodoId = todo.id;
		},
		editTodo(id: string, desc: string) {
			const todo = this.todos.find((todo) => todo.id === id);
			if (!todo) return;
			todo.desc = desc;
		},
	};
};

// Creating a context to share the store
export const TodosContext = createContext(createTodoStore());

// Provider component to wrap the required components
export const TodosProvider: React.FC = ({ children }) => {
	const todosStore = useLocalObservable(createTodoStore);

	return <TodosContext.Provider value={todosStore}>{children}</TodosContext.Provider>;
};

// Hook to access the store
export const useTodosStore = () => useContext(TodosContext);
