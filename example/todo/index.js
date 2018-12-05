import React from 'react';
import {TodoProvider} from "./context/todo";
import TodoContainer from "./componets/todoContainer";
export default function(){
	return (
		<TodoProvider>
			<TodoContainer />
		</TodoProvider>);
}

