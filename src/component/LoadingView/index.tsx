import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

interface LoadingViewProps {
  backgroundColor?: string;
  indicatorColor?: string;
}

const LoadingView: React.SFC<LoadingViewProps> = ({
  backgroundColor,
  indicatorColor
}) => (
  <View style={[styles.loading, { backgroundColor: backgroundColor }]}>
    <ActivityIndicator size="large" color={indicatorColor} />
    <Text style={styles.loadingText}>数据加载中...</Text>
  </View>
);

LoadingView.defaultProps = {
  backgroundColor: "#ffffff",
  indicatorColor: "4C7FEF"
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center"
  }
});

export default LoadingView;
