import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NotDataViewProps {
  msg: string;
}

const NotDataView: React.SFC<NotDataViewProps> = ({ msg }) => (
  <View style={styles.container}>
    <Text>{msg}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NotDataView;
