import React, {useEffect, useState} from 'react';
import MainApp from './app/components/mainApp/mainApp';
import Provider from 'react-redux/lib/components/Provider';
import {createStore} from "redux";
import combineReducers from "./app/redux/reducers/rootReducer";
import { AppLoading } from 'expo';
import {retrieveSavedState} from "./app/services/storageService";

const store = createStore(combineReducers);

export default function App() {
  const [state, setState] = useState({isReady: false});

  useEffect(() => {
    async function loadStateFromStorage() {
      const savedState = await retrieveSavedState();
      setState({
        isReady: true,
        savedState: savedState
      });
    }
    loadStateFromStorage();
  }, []);

  if(!state.isReady) {
    return (
      <AppLoading />
    );
  }
  return (
    <Provider store={store}>
        <MainApp savedState={state.savedState}/>
    </Provider>
  );
}
