export const addUserInfo = (dispatch, getState) => async (user) => {
	try {
		const res = await new Promise((resolve, reject)=>{
			setTimeout(()=>{
				if(user){
					resolve(user);
				}else {
					resolve({name:"default", age: 14});
				}
			}, 1000);
		});
		dispatch({
			type:'ADD_USER',
      payload: res
		});
		return res;
	} catch (error) {
		console.log('error: ', error);
		return error;
	}
};
