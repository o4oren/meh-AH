import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import WalkView from '../walkView/walkView';
import Settings from '../settings/settings';
import About from '../about/about';
import Header from '../header/header';
import {useDispatch} from "react-redux";
import allActions from '../../redux/actions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../../services/rootNavigation';

export default function MainApp(props) {
  const dispatch = useDispatch();

  // app is loading from storage. If it passed a loaded home location, use it.
  useEffect(()=>{
    if (props.savedState) {
      if(props.savedState.homePosition) {
        dispatch(allActions.settingsActions.setHomePosition(props.savedState.homePosition));
      }
      if(props.savedState.allowedRange) {
        dispatch(allActions.settingsActions.setAllowedRange(props.savedState.allowedRange));
      }
    }
  },[]);

  const initialRouteName = props.savedState.homePosition ? 'Home' : 'Settings';
  const Drawer = createDrawerNavigator();

  return (
      <NavigationContainer style={styles.container} ref={navigationRef}>
        <Header />
        <Drawer.Navigator
          initialRouteName={initialRouteName}
          contentContainer
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
