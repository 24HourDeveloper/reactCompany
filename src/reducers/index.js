import { combineReducers } from "redux";
import inputReducer from "./inputReducer";

export default combineReducers({
  input: inputReducer
});
