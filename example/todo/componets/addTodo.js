import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
	width: 400px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&>input{
	  border: 1px solid #999;
	  box-sizing: border-box;
		width: 300px;
		border-radius: 2px;
		height: 30px;
		padding-left: 4px;
	}
	&>button{
		height: 30px;
		padding: 0 15px;
		border: none;
		color: #fff;
		font-size: 16px;
		border-radius: 2px;
		background-color: #6755ff;
		cursor: pointer;
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

const Filter = styled.ul`
	display: flex;
	width: 380px;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
	padding: 10px;
	background-color: #ddd;
	&>li{
		display: inline-flex;
		&>span{
			padding-left: 4px;
			text-transform: capitalize;
		}
	}
`;

import {mapTodo} from "../context/todo";
@mapTodo(['addTodo','switchFilterType','filterType'])
export default class extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			desc:'',
			typeList:['all','finished','unfinished']
		};
	}

	handleChange=(e)=>{
		this.setState({desc:e.target.value});
	};

	shiftFilterType=(index)=>()=>{
		const { filterType,switchFilterType } = this.props;
		const { typeList } = this.state;
		let type = typeList[index];
		if(filterType !== type){
			switchFilterType(type);
		}
	};

	addTodo=()=>{
		const {desc} = this.state;
		const {addTodo} = this.props;
		if(desc){
			addTodo(desc);
			this.setState({desc:''});
		}else {
			alert("desc is empty");
		}
	};

	render() {
		const {filterType} = this.props;
		const {desc,typeList} = this.state;
		return <React.Fragment>
			<Wrapper>
				<input value={desc} onChange={this.handleChange}/>
				<button onClick={this.addTodo}>add</button>
			</Wrapper>
			<Filter>
				{typeList.map((e,idx)=>{
					return <li key={'k-'+idx}>
						<CheckBox className={filterType===e?'checked':''} onClick={this.shiftFilterType(idx)} />
						<span>{e}</span>
					</li>
				})}
			</Filter>
		</React.Fragment>
	}
}
