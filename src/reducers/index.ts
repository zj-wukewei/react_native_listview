import { combineReducers } from "redux";
import { ProjectData } from "../interface";
import { pageReducer, PageState } from "./handlePageReducer";

const reducer = combineReducers({
  projectList: pageReducer<ProjectData>("FETCH_PROJECT_LIST")
});

export default reducer;

interface ReducerType {
  projectList: PageState<ProjectData>;
}
