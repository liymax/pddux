import React from "react";
import produce from "immer";

export function createProvider(reducer, actions, context) {
  return class extends React.PureComponent{
    constructor(props){
      super(props);
      const {initState, reduce} = reducer;
      this.state = {...initState};
      const dispatch = (actionModel)=>{
        return new Promise((resolve)=>{
					let newState = produce(this.state,draft=>{
						reduce(draft, actionModel)
					},(patches, inversePatches) => {
						//console.log("patches:",patches);
						//console.log("inversePatches:",inversePatches);
					});
					this.setState(newState,()=>{
						resolve();
          });
        });
      };
      const getState = ()=>this.state;
      //bind action
      this.actions = {};
      Object.entries(actions).forEach(([k,v])=>{
        this.actions[k] = v(dispatch, getState);
      });
    }

    render(){
      const { Provider } = context;
      const store = {...this.state, ...this.actions};
      return <Provider value={store}>{this.props.children}</Provider>
    }
  }
}

//消费单个Provider
export const map=(context,mapStore=[])=>Component=>{
  return function(){
		const { Consumer } = context;
		return <Consumer>
      {store => {
        const props = mapStore.reduce((o,e)=>{
          o[e] = store[e];
          return o;
        },{});
        return <Component {...props} />
      }}
    </Consumer>
	}
};

//同时消费多个Provider
export const multiMap =(multiCtx=[])=>Component=>{
  return function(){
    let len = multiCtx.length,index=0,allProps={};
    return (function compose(item) {
      let {mapStore,context:{Consumer}} = item;
      if(index < len-1){
        index++;
        return <Consumer>
          {store => {
            mapStore.forEach(e=> allProps[e] = store[e]);
            return compose(multiCtx[index]);
          }}
        </Consumer>
      }else if(index === len-1){
        return <Consumer>
          {store => {
            mapStore.forEach(e=> allProps[e] = store[e]);
            return <Component {...allProps} />
          }}
        </Consumer>
      }
    })(multiCtx[index])
  }
};
