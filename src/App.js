import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./App.css";
import CompanyForm from "./components/CompanyForm";
import reducers from "./reducers/index";

const store = createStore(reducers, {});
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <CompanyForm />
        </div>
      </Provider>
    );
  }
}

export default App;
