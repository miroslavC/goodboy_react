import React, { useRef, useEffect, useState } from 'react';
import DispatcherManager from '../store/DispatcherManager';
import { useDispatch, useSelector } from 'react-redux';
import svg_pawn from '../assets/images/pawn_splash.svg';
import {Link, useHistory, useLocation} from 'react-router-dom';

function PageWelcome() {
  const [goNext, setGoNext] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    goToNextPage()

  }, []);

  return (
    <div className="App">
      <header className="splash_main">

        <img src={svg_pawn} alt="Logo" />

      </header>
    </div>
  );

  function goToNextPage() {
    setTimeout(() => {
      history.replace({
        pathname: '/form'
      });
    }, 2000);
  }
}

export default PageWelcome;