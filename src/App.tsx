import React, { useRef, useEffect, useState } from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import PageWelcome from "./pages/PageWelcome"
import PageForm from "./pages/PageForm"
import DispatcherManager from './store/DispatcherManager';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store/AppState';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
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
          <Route path='/form'>
            <PageForm />
          </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
