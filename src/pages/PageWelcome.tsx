import React, { useRef, useEffect, useState } from 'react';
import DispatcherManager from '../store/DispatcherManager';
import { useDispatch, useSelector } from 'react-redux';

function PageWelcome() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("PageWelcome init...");

  }, []);

  return (
    <div className="App">
      <header className="splash_main">
       
        <p className="title_splash">
         This is PageWelcome
        </p>
      
      </header>
    </div>
  );
}

export default PageWelcome;