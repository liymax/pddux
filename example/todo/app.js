import { hot } from 'react-hot-loader';
import React from 'react';
import {TodoProvider} from "./context/todo";
import TodoContainer from "./componets/todoContainer";

function App(){
	return (
		<TodoProvider>
			<TodoContainer />
		</TodoProvider>);
}

export default hot(module)(App)
