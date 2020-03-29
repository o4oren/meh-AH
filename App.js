import React, {useEffect, useState} from 'react';
import MainApp from './components/mainApp/mainApp';
import Provider from 'react-redux/lib/components/Provider';
import {createStore} from "redux";
import combineReducers from "./redux/reducers/rootReducer";
import { AppLoading } from 'expo';
import {retrieveHomeLocation} from "./services/storageService";

const store = createStore(combineReducers);

export default function App() {
  const [state, setState] = useState({isReady: false});

  useEffect(() => {
    async function loadHomeLocationFromStorage() {
      const homeLocation = await retrieveHomeLocation();
      setState({
        isReady: true,
        homeLocation: homeLocation
      });
    }
    loadHomeLocationFromStorage();
  }, []);

  if(!state.isReady) {
    return (
      <AppLoading />
    );
  }
  return (
    <Provider store={store}>
        <MainApp homeLocation={state.homeLocation}/>
    </Provider>
  );
}
