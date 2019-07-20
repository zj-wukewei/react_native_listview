/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { View, Text } from "react-native";
import Users from "./containers/users";
import { Provider } from "react-redux";
import reduxPromiseMmiddleware from "redux-promise-middleware";
import { createStore, applyMiddleware } from "redux";
import indexReducer from "./reducers";

const store = createStore(
  indexReducer,
  {},
  applyMiddleware(reduxPromiseMmiddleware)
);

const App = () => {
  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
};

export default App;
