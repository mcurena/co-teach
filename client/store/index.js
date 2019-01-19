import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import students from "./students";
import skillFilter from "./skillFilter";
import ratingFilter from "./ratingFilter";

const reducer = combineReducers({ user, students, skillFilter, ratingFilter });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./students";
export * from "./skillFilter";
export * from "./ratingFilter";
