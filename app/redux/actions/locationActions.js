export const UPDATE_CURRENT_POSITION = "UPDATE_CURRENT_LOCATION";
export const UPDATE_DISTANCE = "UPDATE_DISTANCE";
export const EXCEED_ALLOWED_RANGE = "EXCEED_ALLOWED_RANGE";
export const RETURN_TO_ALLOWED_RANGE = "RETURN_TO_ALLOWED_RANGE";

const updateCurrentPosition = (position) => {
  return {
    type: UPDATE_CURRENT_POSITION,
    payload: {currentPosition: position}
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
  updateCurrentPosition: updateCurrentPosition,
  exceedAllowedRange,
  returnToAllowedRange,
  updateDistance
};
