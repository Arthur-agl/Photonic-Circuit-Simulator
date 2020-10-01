import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import Layout from "./screen";

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
