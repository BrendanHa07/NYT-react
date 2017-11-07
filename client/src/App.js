import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import Saved from "./components/Saved";
import Footer from "./components/Footer/Footer";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Main>
              <Route exact path ="/" component={Search} />
              <Route exact path ="/search" component={Search} />
              <Route exact path ="/saved" component={Saved} />
          </Main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
