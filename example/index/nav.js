import React from "react";
import styled from "styled-components";
const Nav = styled('ul')`
	display: flex;
	justify-content: center;
	&>li{
		line-height: 24px;
		width:60px;
		text-align: center;
		border: 1px solid #ddd;
		cursor: pointer;
		margin: 30px 10px 5px;
	}
`;
export default function (props) {
	let {switchModule} =props;
	return <Nav>
		<li onClick={()=>switchModule(0)}>Profile</li>
		<li onClick={()=>switchModule(1)}>Todo</li>
	</Nav>
}
