import React, {useEffect} from "react";
import haversine from "haversine";
import {useDispatch, useSelector} from "react-redux";
import {Text} from "react-native-elements";
import allActions from "../../redux/actions";

export default function distance(props) {
  const currentLocation = useSelector(state => state.location.currentLocation);
  const homeLocation = useSelector(state => state.settings.homeLocation);
  const distance = useSelector(state => state.location.distance);
  const allowedRange = useSelector(state => state.settings.allowedRange);
  const dispatch = useDispatch();

  const calcDistance = () => {
    if (homeLocation && currentLocation) {
      const dist = haversine({
        latitude: homeLocation.latitude,
        longitude: homeLocation.longitude
      }, {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      }, { unit: 'meter' });
      if (Math.abs(distance - dist) >= 1) {
        dispatch(allActions.locationActions.updateDistance((Math.round(dist))));
      }
    }
  };

  function checkExceeding() {
    if(distance > allowedRange) {
      dispatch(allActions.locationActions.exceedAllowedRange());
    } else {
      dispatch(allActions.locationActions.returnToAllowedRange());
    }
  }

  useEffect(() => {
    calcDistance();
    checkExceeding();
  });

  if(props.alerted) {
    return (
      <Text h4 style={{color: '#e72719', fontWeight: 'bold'}}>מרחק: {distance} מטרים! </Text>
    );
  }
  return (
    <Text h4>מרחק: {distance} מטרים </Text>
  );
}
