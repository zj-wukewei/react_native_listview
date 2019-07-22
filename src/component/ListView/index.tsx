import React from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from "react-native";
import ErrorView from "../ErrorView";
import NotDataView from "../NotDataView";
import LoadingView from "../LoadingView";

interface ListViewProps {
  dataSource: ReadonlyArray<any>;
  renderItem: ListRenderItem<any>;
  onFetchList: (
    loading: boolean,
    isRefreshing: boolean,
    loadMore: boolean,
    pn: number
  ) => void;
  isRefreshing: boolean;
  loading: boolean;
  loadMore: boolean;
  hasMore: boolean;
  error: boolean;
  refreshColor?: string;
  backgroundColor?: string;
  defaultPage?: number;
}

const DefaultPage = 0;

class ListView extends React.PureComponent<ListViewProps> {
  static defaultProps = {
    refreshColor: "#4C7FEF",
    backgroundColor: "#ffffff",
    defaultPage: DefaultPage
  };
  page: number;

  constructor(props: ListViewProps) {
    super(props);
    const { defaultPage } = props;
    this.page = defaultPage || DefaultPage;
  }

  componentDidMount() {
    const { onFetchList } = this.props;
    onFetchList(true, false, false, this.page);
  }

  onEndReached = () => {
    const { onFetchList, loadMore, hasMore, error } = this.props;
    if (loadMore || !hasMore || error) {
      return;
    }
    this.page = this.page + 1;
    onFetchList(false, false, true, this.page);
  };

  renderFooter = () => {
    const { loadMore, error } = this.props;
    if (loadMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text style={{ marginLeft: 5 }}>加载中...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <TouchableOpacity
          style={styles.errorFooter}
          onPress={() => {
            const { onFetchList } = this.props;
            onFetchList(false, false, true, this.page);
          }}
        >
          <Text>加载出错，点击重试</Text>
        </TouchableOpacity>
      );
    }
    return <View />;
  };

  handleRefresh = () => {
    const { onFetchList, defaultPage } = this.props;
    this.page = defaultPage || DefaultPage;
    onFetchList(false, true, false, this.page);
  };

  render() {
    const {
      dataSource,
      renderItem,
      isRefreshing,
      loading,
      error,
      refreshColor,
      backgroundColor,
      defaultPage
    } = this.props;
    const refreshColors: string[] = [refreshColor || "#4C7FEF"];
    if (loading && this.page === defaultPage) {
      return (
        <LoadingView
          indicatorColor={refreshColor}
          backgroundColor={backgroundColor}
        />
      );
    }

    if (error && this.page === defaultPage) {
      return (
        <ErrorView
          onPress={() => {
            const { onFetchList } = this.props;
            onFetchList(true, false, false, this.page);
          }}
        />
      );
    }

    return (
      <FlatList
        data={dataSource}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={NotDataView}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
        ListFooterComponent={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.handleRefresh}
            colors={refreshColors}
            progressBackgroundColor={backgroundColor}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  errorFooter: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ListView;
