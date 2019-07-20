import { User } from "./constans";
import { fetchUserList } from "./api";
import { pageAction } from "../reducers/handlePageReducer";
import { UserData, CommomListParams } from "../interface";

export const fetchUserListAction = pageAction<UserData, CommomListParams>(
  User.FETCH_USER_LSIT,
  fetchUserList
);
