import { combineReducers } from "redux";
import { UserData } from "../interface";
import { pageReducer, PageState } from "./handlePageReducer";
import { User } from "../actions/constans";

const reducer = combineReducers({
  userList: pageReducer<UserData>(User.FETCH_USER_LSIT)
});

export default reducer;

export interface ReducerType {
  userList: PageState<UserData>;
}
