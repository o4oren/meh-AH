import MapView, {Circle, Marker, AnimatedRegion} from "react-native-maps";
import React, {useEffect, useRef, useState} from "react";
import { Dimensions } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import * as Permissions from "expo-permissions";
import allActions from "../../redux/actions";
import * as Location from "expo-location";

export default function mapView(props) {
  const LATITUDE_DELTA = 0.003;
  const LONGITUDE_DELTA = 0.003;
  const currentPosition = useSelector(state => state.location.currentPosition);
  const [initialPosition, setInitialPosition] = useState(null);
  const [heading, setHeading] = useState(0)
  const homePosition = useSelector(state => state.settings.homePosition);
  const radius = useSelector(state => state.settings.allowedRange);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      // flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - props.heightCompensation,
      marginTop: 20,
      minHeight: 100,
      minWidth: 100
    }
  });

  useEffect(() => {
    async function watchPosition() {
      const positionOptions = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
        mayShowUserSettingsDialog: true
      };

      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        dispatch(allActions.errorActions.noLocationPermissionsError());
      } else {
        Location.getCurrentPositionAsync({}).then(position => {
          setInitialPosition(position.coords);
        });
        await Location.watchPositionAsync(positionOptions, position => {
          dispatch(allActions.locationActions.updateCurrentPosition(position.coords));
        });
      }
    }

    async function watchHeading() {
      await Location.watchHeadingAsync(heading => setHeading(heading.trueHeading));
    }
    watchHeading();
    watchPosition();
  }, []);

  useEffect(() => {
    if (currentPosition && mapRef.current) {
      const camera = {
        center: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
        heading: heading
      };
      mapRef.current.animateCamera(camera);
    }
  }, [heading]);

  useEffect(() => {
    if (currentPosition && mapRef.current) {
      const camera = {
        center: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
      };
      mapRef.current.animateCamera(camera, 1000);
    }
  }, [currentPosition]);


  function renderMapView() {
    function addHomeMarker() {
      if(homePosition) {
        return (
          <Marker.Animated
            ref={userMarkerRef}
            coordinate={{
              latitude: homePosition.latitude,
              longitude: homePosition.longitude
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
      if(homePosition) {
        return (
          <Circle
            center={{
              latitude: homePosition.latitude,
              longitude: homePosition.longitude
            }}
            radius={radius}
            strokeColor='#EC1616'
            strokeWidth={2}
          />
        );
      }
    }
    if(currentPosition && initialPosition) {
      return (
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          loadingEnabled={true}
          showsPointsOfInterest={true}
          initialCamera={{
            center: {
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            },
            pitch: 30,
            heading: currentPosition.heading,
            altitude: 300,
            zoom: 18.5
          }}
        >
          {addHomeMarker()}
          {addRangeRadius()}
          <Marker
            coordinate={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
              }}
            ref={userMarkerRef}
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


