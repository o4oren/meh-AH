import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from 'react-native-elements';
import RangeSlider from './rangeSlider';
import {useDispatch, useSelector} from "react-redux";
import allActions from '../../redux/actions';
import MapView from '../mapView/mapView';
import {storeHomeLocation} from '../../services/storageService';
import Header from "../header/header";

export default function settings({ navigation }) {
  const currentLocation = useSelector(state => state.location.currentLocation);
  const dispatch = useDispatch();

  async function setHomeLocation() {
    dispatch(allActions.settingsActions.setHomeLocation(currentLocation));
    await storeHomeLocation(currentLocation);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <RangeSlider style={styles.slider}/>
      <View style = {styles.divider} />
      <Text style={styles.text}>קבע את מיקום הבית למיקום הנוכחי</Text>
      <Button
        style={styles.button}
        title="קבע מיקום בית"
        type="solid"
        onPress={setHomeLocation}
        buttonStyle={{backgroundColor: '#5388d0'}}
      />
      <MapView style={styles.mapView}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    height: 40
  },
  slider: {
    alignSelf: 'stretch'
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 10
  },
  divider: {
    borderWidth: 0.5,
    borderColor:'#c4c4c4',
    margin:10,
    alignSelf: 'stretch'
  }
});
