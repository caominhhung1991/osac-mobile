import React from 'react';
import OSAC from './containers/OSAC/OSAC';
import { combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import OsacReducer from './containers/OSAC/OsacReducer';

const reducers = combineReducers({
  osac: OsacReducer,
})

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <OSAC />
      </Provider>
    )
  }
}
