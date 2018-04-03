import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import Login from './Login';
import NotFound from './NotFound';


class App extends Component {
  render() {
    return (
      
        <BrowserRouter>
        <React.Fragment>  
            <Header />
            <Switch>
              <Route exact path="/"  component={Welcome}/>
              <Route exact path="/BOL"  component={Login}/>
              <Route component={NotFound}/>
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      
    );
  }
}

export default App;
