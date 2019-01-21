import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import students from "./students";
import skillFilter from "./skillFilter";
import ratingFilter from "./ratingFilter";
import groups from "./groups";
import activeFilter from "./activeFilter";
import observations from "./observations";

const reducer = combineReducers({
  user,
  students,
  skillFilter,
  ratingFilter,
  groups,
  activeFilter,
  observations
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./students";
export * from "./skillFilter";
export * from "./ratingFilter";
export * from "./groups";
export * from "./activeFilter";
export * from "./observations";
