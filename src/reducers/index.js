import { combineReducers } from "redux";
import LoginDataReducer from "./LoginDataReducer";
import TaskListReducer from "./TaskListReducer";
import PositionTrackerReducer from "./PositionTrackerReducer";
const combinedReducers = combineReducers({
  LoginDataReducer,
  TaskListReducer,
  PositionTrackerReducer,
});
export default combinedReducers;
