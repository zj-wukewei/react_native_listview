import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorViewProps {
  errorMsg?: string;
  onPress: () => void;
}

const ErrorView: React.SFC<ErrorViewProps> = ({ errorMsg }) => (
  <View style={styles.container}>
    <Text>{errorMsg}</Text>
  </View>
);

ErrorView.defaultProps = {
  errorMsg: "服务器出差,请稍后再试..."
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ErrorView;
