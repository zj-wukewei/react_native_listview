import React from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import ErrorView from "../ErrorView";
import NotDataView from "../NotDataView";
import LoadingView from "../LoadingView";
import { StringLiteral } from "@babel/types";

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
}

const defaultPage = 0;

class ListView extends React.PureComponent<ListViewProps> {
  static defaultProps = {
    refreshColor: "#4C7FEF",
    backgroundColor: "#ffffff"
  };

  page: number = defaultPage;

  componentDidMount() {
    const { onFetchList } = this.props;
    onFetchList(true, false, false, this.page);
  }

  onEndReached = () => {
    const { onFetchList, loadMore, hasMore } = this.props;
    if (loadMore || !hasMore) {
      return;
    }
    this.page = this.page + 1;
    onFetchList(false, false, true, this.page);
  };

  renderFooter = () => {
    const { loadMore } = this.props;
    if (loadMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
        </View>
      );
    }
    return <View />;
  };

  handleRefresh = () => {
    const { onFetchList } = this.props;
    this.page = defaultPage;
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
      backgroundColor
    } = this.props;
    const refreshColors: string[] = [refreshColor || "#4C7FEF"];

    if (loading && this.page === 1) {
      return (
        <LoadingView
          indicatorColor={refreshColor}
          backgroundColor={backgroundColor}
        />
      );
    }

    if (error && this.page === 1) {
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
  footer: {}
});

export default ListView;
