import { v4 as uuid } from 'uuid';
import { Todo } from './type';

const todos: Todo[] = [
	{
		id: uuid(),
		desc: 'Learn React',
		isComplete: true,
	},
	{
		id: uuid(),
		desc: 'Learn Redux',
		isComplete: true,
	},
	{
		id: uuid(),
		desc: 'Learn Redux-ToolKit',
		isComplete: false,
	},
];

export const todosInitialState = [...todos];
