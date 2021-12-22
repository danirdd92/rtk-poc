import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { Provider } from 'react-redux';
// import store from './redux-rtk';
import { TodosProvider } from './mobx-store';

ReactDOM.render(
	<TodosProvider>
		<App />
	</TodosProvider>,
	document.getElementById('root')
);
