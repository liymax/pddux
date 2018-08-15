export const addTodo = (dispatch, getState) => async (desc) => {
	await dispatch({
		type:'ADD_TODO',
		payload: desc
	});
};

export const removeTodo = (dispatch, getState) => async (id) => {
	await dispatch({
		type:'REMOVE_TODO',
		payload: id
	});
};

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
