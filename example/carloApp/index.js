import React from "react";
import styled from "styled-components";

const InputGroup=styled('section')`
	display: flex;
	justify-content: center;
	align-items: center;
	&>label{
		font-size: 14px;
		color: darkorange;
		margin-right: 5px;
	}
	&>input{
		height: 30px;
		width: 150px;
		font-size: 14px;
		margin-right: 15px;
	}
	&>button{
		background-color: #2554f9;
		color: #fff;
		font-size: 15px;
	}
`;

const OutputGroup = styled('ul')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	&>li{
		line-height: 30px;
		font-style: normal;
		border-bottom: 1px solid #ddd;
		&>label{
			color:#f45451;
			margin-right: 15px;
		}
	}
`;

export default class extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userName:'',
			from:'',
			users:[]
		}
	}

	handleChange=(prop)=>(e)=>{
		let dom = e.currentTarget;
		this.setState({[prop]:dom.value});
	};

	addUser= async ()=>{
		let {userName,from} = this.state;
	  await insertUser(userName,from);
		await this.loadUsers();
	};

	loadUsers = async ()=>{
		let users = await getUsers();
		console.log(users);
		this.setState({users});
	};

	async componentDidMount(){
		await this.loadUsers();
	}

	render(){
		let {userName,from,users} = this.state;
		return <React.Fragment>
			<InputGroup>
				<label>UserName:</label><input value={userName} onChange={this.handleChange("userName")}/>
				<label>From:</label><input value={from} onChange={this.handleChange("from")}/>
				<button onClick={this.addUser}>Submit</button>
			</InputGroup>
			<OutputGroup>
				{users.map(e=>{
					let {username,area} = e;
					return <li><label>{username}</label><em>{area}</em></li>
				})}
			</OutputGroup>
		</React.Fragment>
	}
}
