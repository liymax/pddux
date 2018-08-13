import React from "react";
import {createProvider, map} from '../../sudux';
export const userCtx = React.createContext(null);

import * as reducer from "../reducers/user";
import * as actions from "../actions/user";

export const UserProvider = createProvider(reducer,actions,userCtx);

export function mapUser(mapProps) {
  return map(userCtx, mapProps);
}




