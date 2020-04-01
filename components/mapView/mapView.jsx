import MapView, {Circle, Marker} from "react-native-maps";
import React, {useEffect} from "react";
import { Dimensions } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import * as Permissions from "expo-permissions";
import allActions from "../../redux/actions";
import * as Location from "expo-location";

export default function mapView() {
  const currentLocation = useSelector(state => state.location.currentLocation);
  const homeLocation = useSelector(state => state.settings.homeLocation);
  const radius = useSelector(state => state.settings.allowedRange);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      flex: 1,
      width: Dimensions.get('window').width,
      flexGrow: 0.9,
      marginTop: 20,
      minHeight: 100,
      minWidth: 100
    }
  });

  useEffect(() => {
    async function watchLocations() {
      const locationOptions = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 500,
        distanceInterval: 0.5,
        mayShowUserSettingsDialog: true
      };

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
  }, []);


  function renderMapView() {
    function addHomeMarker() {
      if(homeLocation) {
        return (
          <Marker
            coordinate={{
              latitude: homeLocation.latitude,
              longitude: homeLocation.longitude
            }}
            title='Home'
            image={require('../../assets/house-hand-drawn-128.png')}
            anchor={{x: 0.5, y: 0.5}}
            centerOffset={{x: 0.5, y: 0.5}}
          />
        );
      }
    }

    function addRangeRadius() {
      if(homeLocation) {
        return (
          <Circle
            center={{
              latitude: homeLocation.latitude,
              longitude: homeLocation.longitude
            }}
            radius={radius}
            strokeColor='#EC1616'
            strokeWidth={2}
          />
        );
      }
    }

    if(currentLocation) {
      return (
        <MapView
          style={styles.mapStyle}
          loadingEnabled={true}
          showsPointsOfInterest={false}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          {addHomeMarker()}
          {addRangeRadius()}
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            }}
            title='Me'
            image={require('../../assets/walking-the-dog-128.png')}
            anchor={{x: 0.5, y: 0.5}}
            centerOffset={{x: 0.5, y: 0.5}}
          />
        </MapView>
      );
    }
  }

  return (
    <View>
      {renderMapView()}
    </View>
  );
}


