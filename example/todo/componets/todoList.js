import React from "react";
import styled from "styled-components";
import feather from "feather-icons";
const List = styled.ul`
	width: 400px;
	padding: 20px 0;
	&>li{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 0;
		border-bottom: 1px solid #ccc;
		position: relative;
		&:hover>i{		
			display: inline-flex;
		}
		&>p{
		  flex: 1;
		  padding: 0 8px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`;

const Del =styled.i`
  display: none;
  position: absolute;
  right: 40px;
  background-color: #fff;
  z-index: 5;
  &>svg{
  	width:24px;
	  height:24px;
	  stroke: #3E9AEF;
	  stroke-width:2px;
  } 
`;
const CheckBox =styled.label`
	width: 14px;
	height: 14px;
	border: 1px solid #C0C6CA;
	border-radius: 2px;
	background-color: #fff;
	margin-right: 10px;
	position: relative;
	cursor: pointer;
	&.checked{
		border-color: #3E9AEF;
		background-color: #3E9AEF;
		&:after{
			content: "\00a0";
			display: inline-block;
			width: 8px;
			height: 4px;
			border: 2px solid #fff;
			border-top-width: 0;
			border-right-width: 0;
			transform: rotate(-50deg);
			position: absolute;
			top:3px;
			left:2px;
		}
	}
`;
import {mapTodo} from "../context/todo";

@mapTodo(['todoList','removeTodo','finishOrCancel','filterType'])
export default class extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { list:[] };
	}

	static getDerivedStateFromProps(props,state){
		const {filterType,todoList} = props;
		state.list=todoList;
		if(filterType === 'finished'){
			state.list=todoList.filter(e=>e.isComplete);
		}else if(filterType === 'unfinished'){
			state.list=todoList.filter(e=>!e.isComplete);
		}
		return state;
	}

	createDelIcon(){
		return {__html: feather.icons.delete.toSvg()}
	}

	removeTodo=(id)=>()=>{
		const {removeTodo} = this.props;
		removeTodo(id);
	};

	finishOrCancel=({id,isComplete})=>(e)=>{
		e.stopPropagation();
		const {finishOrCancel} = this.props;
		finishOrCancel({id,isComplete});
	};

	render() {
		let {list} = this.state;
		return <List>
			{list.map((e,idx)=>{
				let {desc,isComplete,id} = e;
				return <li key={'k'+idx}>
					<em>{id}</em>
					<p>{desc}</p>
					<Del dangerouslySetInnerHTML={this.createDelIcon()} onClick={this.removeTodo(id)} />
					<CheckBox className={isComplete?'checked':''}
					          onClick={this.finishOrCancel({id,isComplete:!isComplete})}/>
				</li>
			})}
		</List>;
	}
}
