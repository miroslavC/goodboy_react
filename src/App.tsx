import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import PageWelcome from "./pages/PageWelcome"
import PageHelpOption from "./pages/PageHelpOption"
import PageForm from "./pages/PageForm"
import PageCheckInfo from "./pages/PageCheckInfo"
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Switch>
          <Route exact path="/" component={PageWelcome} />
          <Route path='/welcome'>
            <PageWelcome />
          </Route>
          <Route path='/option'>
            <PageHelpOption />
          </Route>
          <Route path='/form'>
            <PageForm />
          </Route>
          <Route path='/check_info'>
            <PageCheckInfo />
          </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
