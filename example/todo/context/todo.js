import React from "react";
import {createProvider, map} from '../../../src';

import * as reducer from "./reducers/todo";
import * as actions from "./actions/todo";

export const todoCtx = React.createContext(null);
export const TodoProvider = createProvider(reducer,actions,todoCtx);

export function mapTodo(mapState) {
	return map(todoCtx, mapState);
}
