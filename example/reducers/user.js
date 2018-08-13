export const initState = {
	userList:[]
};

export const reduce = (state = initState, action) => {
	let {type, payload} =action;
  if (type === 'ADD_USER') {
      state.userList.push(payload);
  }
};
