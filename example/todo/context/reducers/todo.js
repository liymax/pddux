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
