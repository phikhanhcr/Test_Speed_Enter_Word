import React from 'react';
import MainCourse from './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Forgot from './components/Login/Forgot';
import SignIn from './components/Login/SignIn';
function App() {
  return (  
      <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <MainCourse />
          </Route>  
          <Route exact path="/login">
            <Login />
          </Route> 
          <Route exact path="/login/forgot">
            <Forgot />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
