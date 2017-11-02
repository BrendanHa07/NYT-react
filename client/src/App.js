import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Main>
              <Route exact path ="/" component={Search} />
              <Route exact path ="/Search" component={Search} />
          </Main>
        </div>
      </Router>
    );
  }
}

export default App;
