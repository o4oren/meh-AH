import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Distance from './distance';
import {useSelector} from "react-redux";
import MapView from '../mapView/mapView';
import { Audio } from 'expo-av';
import Header from "../header/header";

export default function walkView({navigation}) {
  const isInRange = useSelector(state => state.location.isInRange);
  const soundObject = new Audio.Sound();

  async function playSound() {
    try {
      await soundObject.loadAsync(require('../../assets/audio/alarm_1.wav'));
      soundObject.setIsLoopingAsync(true);
      soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  function checkRange() {
    if (!isInRange) {
      Alert.alert(
        'יצאת מהטווח המותר!',
        'על פי הנחיות משרד הבריאות, יציאה של יחיד או של אנשים הגרים באותו מקום, מותרת רק לזמן קצר ובמרחק של עד 100 מטרים ממקום המגורים.',
        [
          {
            text: 'הבנתי',
            onPress: () => {
              soundObject.setIsLoopingAsync(false).then(
                soundObject.stopAsync()
            );
            }
          },
        ],
        { cancelable: false }
      );
      playSound();
    }
    return (<Distance alerted={!isInRange}/>);
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      {checkRange()}
      <MapView style={styles.mapView} heightCompensation='140'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mapView: {
    alignSelf: 'flex-end',
    height: 400
  },
  distance: {
    flex: 1
  }
});
