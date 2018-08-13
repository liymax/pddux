import React from "react";
import produce from "immer";

export function createProvider(reducer, actions, context) {
  return class extends React.PureComponent{
    constructor(props){
      super(props);
      const {initState, reduce} = reducer;
      this.state = {...initState};

      const dispatch = async (actionModel)=>{
        let newState = produce(this.state,draft=>{
          reduce(draft, actionModel)
        });
        this.setState(newState)
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
      return (
        <Provider value={store}>
          {this.props.children}
        </Provider>);
    }
  }
}

//消费单个Provider
export const map=(context,mapProps=[])=>Component=>{
  return class extends React.Component{
    render() {
      const { Consumer } = context;
      return (
        <Consumer>
          {store => {
            const props = mapProps.reduce((o,e)=>{
              o[e] = store[e];
              return o;
            },{});
            return <Component {...props} />
          }}
        </Consumer>
      )
    }
  }
};


//消费多个Provider
export const multiMap =(contexts=[])=>Component=>{
  return class extends React.Component{
    render(){
      let len = contexts.length,index=0,allProps={};
      return (function compose(item) {
        let {props,context:{Consumer}} = item;
        if(index < len-1){
          index++;
          return <Consumer>
            {store => {
              props.forEach(e=> allProps[e] = store[e]);
              return compose(contexts[index]);
            }}
          </Consumer>
        }else if(index === len-1){
          return <Consumer>
            {store => {
              props.forEach(e=> allProps[e] = store[e]);
              return <Component {...allProps} />
            }}
          </Consumer>
        }
      })(contexts[index])
    }
  }
};


