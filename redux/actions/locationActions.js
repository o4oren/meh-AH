export const UPDATE_CURRENT_LOCATION = "UPDATE_CURRENT_LOCATION";
export const UPDATE_DISTANCE = "UPDATE_DISTANCE";
export const EXCEED_ALLOWED_RANGE = "EXCEED_ALLOWED_RANGE";
export const RETURN_TO_ALLOWED_RANGE = "RETURN_TO_ALLOWED_RANGE";

const updateCurrentLocation = (location) => {
  return {
    type: UPDATE_CURRENT_LOCATION,
    payload: {currentLocation: location}
  };
};

const exceedAllowedRange = () => {
  return {
    type: EXCEED_ALLOWED_RANGE
  };
};

const returnToAllowedRange = () => {
  return {
    type: RETURN_TO_ALLOWED_RANGE
  };
};

const updateDistance = (distance) => {
  return {
    type: UPDATE_DISTANCE,
    payload: {distance: distance}
  };
};

export default {
  updateCurrentLocation,
  exceedAllowedRange,
  returnToAllowedRange,
  updateDistance
};
