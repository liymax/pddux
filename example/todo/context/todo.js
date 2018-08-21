import React from "react";
import {createProvider, map, multiMap} from '../../../lib';

import * as reducer from "./reducers/todo";
import * as actions from "./actions/todo";

export const todoCtx = React.createContext(null);
export const TodoProvider = createProvider(reducer,actions,todoCtx);

export function mapTodo(mapStore) {
	return map(todoCtx, mapStore); //or
	//return multiMap([{mapStore,context:todoCtx}]);
}
