import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import WalkView from '../walkView/walkView';
import Settings from '../settings/settings';
import About from '../about/about';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from "react-redux";
import allActions from '../../redux/actions';
import * as Permissions from 'expo-permissions';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function MainApp(props) {
  const homeLocation = useSelector(state => state.settings.homeLocation);
  const dispatch = useDispatch();

  // app is loading from storage. If it passed a loaded home location, use it.
  useEffect(()=>{
    if (props.savedState) {
      if(props.savedState.homeLocation) {
        dispatch(allActions.settingsActions.setHomeLocation(props.savedState.homeLocation));
      }
      if(props.savedState.allowedRange) {
        dispatch(allActions.settingsActions.setAllowedRange(props.savedState.allowedRange));
      }
    }
  },[]);

  const locationOptions = {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 2000,
    distanceInterval: 2,
    mayShowUserSettingsDialog: true
  };

  async function watchLocations() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(allActions.errorActions.noLocationPermissionsError());
    } else {
      await Location.watchPositionAsync(locationOptions, location => {
        dispatch(allActions.locationActions.updateCurrentLocation(location.coords));
      });
    }
  }

  watchLocations();

  const initialRouteName = props.homeLocation ? 'Home' : 'Settings';
  const Drawer = createDrawerNavigator();

  return (
      <NavigationContainer style={styles.container}>
        <Drawer.Navigator
          initialRouteName={initialRouteName}

        >
          <Drawer.Screen name="Home" component={WalkView} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
