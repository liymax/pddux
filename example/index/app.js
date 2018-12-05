import { hot } from 'react-hot-loader';
import React,{lazy,Suspense} from 'react';
import GlobalStyle from "./reset";
import Nav from "./nav";

const Profile = lazy(()=>import("../carloApp"));
const Todo = lazy(()=>import("../todo"));

class App extends React.PureComponent {
	constructor(){
		super();
		this.state={
			moduleId:0
		}
	}

	switchModule=(moduleId)=>{
		this.setState({moduleId})
	};

	render(){
		let {moduleId} = this.state;
		return (
			<React.Fragment>
				<Nav switchModule={this.switchModule}/>
				<Suspense fallback={<h3>Loading...</h3>}>
					{
						do{
							if(moduleId===0) {
								 <Profile />
							}else if(moduleId===1){
								 <Todo />
							}
						}
					}
				</Suspense>
				<GlobalStyle />
			</React.Fragment>)
	}
}

export default hot(module)(App)
