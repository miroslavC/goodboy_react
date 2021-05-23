import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import PageWelcome from "./pages/PageWelcome"
import PageHelpOption from "./pages/PageHelpOption"
import PageForm from "./pages/PageForm"
import PageCheckInfo from "./pages/PageCheckInfo"
import DispatcherManager from './store/DispatcherManager';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store/AppState';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    console.log("MMMMMM  PageWelcome init...");

    if (!user) {
      // --- First in App start Init step ---
      DispatcherManager.getInstance().dispatchInitState(dispatch);
    }
  }, []);
  
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
