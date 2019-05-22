import React, { Component } from 'react';
import './App.css';
import IgracList from './component/IgracList';
import {rootReducer} from './store/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './store/sagas';
import UtakmicaList from './component/UtakmicaList';
import OkupljanjeCom from './component/OkupljanjeCom';
import { Router, Route, Switch} from 'react-router';
import {BrowserRouter,Link} from 'react-router-dom';
//import Navigation from './component/Navigation';

const sagaMiddleware=createSagaMiddleware();

const bookStore=createStore(rootReducer,
  applyMiddleware(sagaMiddleware)
  );
sagaMiddleware.run(rootSaga);
const Navigation=()=>{
  return (
      <div>
      <h1>*Beton Manager*</h1>
          <div>
          <Link to="/">Igraci</Link>
              <Link  to="/utakmice">Utakmice</Link>
              <Link  to="/okupljanje">Okupljanja</Link>
          </div>
      </div>
  );
}

class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <div className="main">
        <Provider store={bookStore}>
        <Navigation/>
        <Switch>
      <Route exact path="/" component={IgracList}></Route>
      <Route path="/utakmice" component={UtakmicaList}></Route>
      <Route path="/okupljanje" component={OkupljanjeCom}></Route>
      </Switch>
      </Provider>
      </div>
      </BrowserRouter>



      /*<div className="App">
        <header className="App-header">
        <h1>* Beton Manager *</h1>
           <Provider store={bookStore}>
           <div class="glavni"> <div class="igraci"><IgracList/></div>
            <div class="utakmice"><UtakmicaList/> <OkupljanjeCom/></div></div>
            </Provider>
        </header>
      </div>*/
    );
  }
}

export default App;
