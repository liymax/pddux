## pddux
基于react新提供的context api，实现的一套类似redux的状态管理工具。简洁灵活易扩展，依赖少，源码不足百行
> 之前名字叫sudux,现在改为pddux。所以sudux包就放弃了
### Install
```shell
npm install pddux -S
yarn add pddux
```
### Quick Start
首先，我们定义一个action, 路径context/actions/todo.js(来自example/todo)
```javascript
export const finishOrCancel = (dispatch, getState) => async ({id,isComplete}) => {
	await dispatch({
		type:'FINISH_OR_CANCEL',
		payload: {id,isComplete}
	});
};

export const switchFilterType = (dispatch, getState) => async (type) => {
	await dispatch({
		type:'SWITCH_FILTER_TYPE',
		payload: type
	});
};
```
> 这里统一运用asysnc function,以便优雅的处理异步流程

接着，我们定义一个reducer, 路径context/reducers/todo.js(来自example/todo)
```javascript
export const initState = {
	todoList:[
		{desc:'init todo',isComplete:true,id:1}
	],
	filterType:'all'
};

export const reduce = (state = initState, action) => {
	let {type, payload} =action;
	if(type === 'ADD_TODO') {
		let { todoList } =state,len=todoList.length;
		let id = len>0 ? todoList[len-1].id : 0;
		let todo = {desc:payload,isComplete:false,id:id+1};
		state.todoList.push(todo);
	}else if(type === 'REMOVE_TODO'){
		let { todoList } =state,len=todoList.length;
		for(let i=0;i<len;i++){
			let {id} = todoList[i];
			if(id === payload){
				state.todoList.splice(i,1);
				break;
			}
		}
	}else if(type === 'FINISH_OR_CANCEL'){
		let { todoList } =state,len=todoList.length;
		for(let i=0;i<len;i++){
			let {id} = todoList[i];
			if(id === payload.id){
				state.todoList[i].isComplete=payload.isComplete;
				break;
			}
		}
	}else if(type==="SWITCH_FILTER_TYPE"){
		state.filterType = payload;
	}
};
```
>内部的状态变更是基于immer实现的，这里的state就是immer中可修改的副本，直接修改后就会返回变更后的状态。如果手动return state;反而会报错。

最后，我们定义一个context, 路径context/todo.js(来自example/todo)
```javascript
import React from "react";
import {createProvider, map} from 'sudux';

import * as reducer from "./reducers/todo";
import * as actions from "./actions/todo";

export const todoCtx = React.createContext(null);
//这是属于todoCtx的Provider
export const TodoProvider = createProvider(reducer,actions,todoCtx);

//这是绑定todoCtx的映射函数，方便消费TodoProvider
export function mapTodo(mapState) {
	return map(todoCtx, mapState);
}
```

### 基本概念
这是一个类似redux状态管理库，形式上和redux很相似。而内部实现上，则充分利用react16.3以来提供的新context api，以更符合直觉的方式予以实现，并与该新的context api在思想上高度切合，都是基于供需关系的基本思想。本库总共只有三个api,分别是createProvider、map和multiMap。
其中createProvider，专门用来创建各种上下文(contxet)的Provider，从上例可见一斑；
而map则专门来消费指定上下文(contxet)的Provider，也就是将其中的状态映射到组件的属性；
最后，有时一个组件可能会需要多个Provider中的store，于是就轮到multiMap上场了。总而言之，通过该库可以让这种供需式的状态管理变得更加方便灵活，且可控性高。

>map使用示例
```javascript
@map(todoCtx,['switchFilterType','filterType'])
//等效于 @mapTodo(['switchFilterType','filterType'])
class MyComponent extends React.Component{
    render(){
        cosnt {switchFilterType,filterType} = this.props;
    }
}
```

>multiMap使用示例
```javascript
@multiMap([
	{context: todoCtx,mapState:['switchFilterType','filterType']},
	{context: otherCtx,mapState:['your state name']}
])
class MyComponent extends React.Component{
    render(){
        cosnt {switchFilterType,filterType} = this.props;
    }
}
```
