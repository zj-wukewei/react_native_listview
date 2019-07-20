import React from "react";
import { View, Text, ListRenderItemInfo } from "react-native";
import { connect } from "react-redux";
import ListView from "../../component/ListView";
import { fetchUserListAction } from "../../actions/user";
import { ReducerType } from "../../reducers";
import { CommomListParams, UserData } from "../../interface";
import { PageState } from "../../reducers/handlePageReducer";

interface UserListProps {
  fetchUserList: (
    loading: boolean,
    isRefreshing: boolean,
    loadMore: boolean,
    param: CommomListParams
  ) => void;
  userList: PageState<UserData>;
}

class UserList extends React.Component<UserListProps> {
  onFetchList = (
    loading: boolean,
    isRefreshing: boolean,
    loadMore: boolean,
    page: number
  ) => {
    const { fetchUserList } = this.props;
    fetchUserList(loading, isRefreshing, loadMore, { start: page });
  };

  renderUserItem = ({ item }: ListRenderItemInfo<UserData>) => (
    <View>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.age}</Text>
      <Text>{item.sex}</Text>
    </View>
  );

  render() {
    const { userList } = this.props;
    return (
      <ListView
        {...userList}
        onFetchList={this.onFetchList}
        renderItem={this.renderUserItem}
      />
    );
  }
}
function mapStateToProps(state: ReducerType) {
  return {
    userList: state.userList
  };
}
export default connect(
  mapStateToProps,
  {
    fetchUserList: fetchUserListAction
  }
)(UserList);
