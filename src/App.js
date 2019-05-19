import React, {Component} from 'react';

import './App.css';
import CompanyForm from './components/CompanyForm';
import {companies} from "./companies";
import { AppContext } from './AppContext';

class App extends Component {
  render(){
  return (
    <AppContext.Provider value={companies}>
      <div className="App">
        <CompanyForm/>
      </div>
    </AppContext.Provider>
  );
  }
}

export default App;
