# react-native-listview
该项目是对FlastView的简单封装使得具有下拉刷新上拉加载更多、出错重试的功能，配合redux使用。

## 使用
采用简单的用户列表举例：
````
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

````

action很简单

````
export const fetchUserListAction = pageAction<UserData, CommomListParams>(
  User.FETCH_USER_LSIT,
  fetchUserList
);

````

reducers也很简单，不需要写任何其它纯函数

````
const reducer = combineReducers({
  userList: pageReducer<UserData>(User.FETCH_USER_LSIT)
});

export default reducer;

export interface ReducerType {
  userList: PageState<UserData>;
}
````