import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 50px;
`;
import AddTodo from "./addTodo";
import TodoList from "./todoList";
export default class extends React.PureComponent {
	render() {
		return <Container>
			<AddTodo />
			<TodoList />
		</Container>;
	}
}
