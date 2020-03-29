export const SET_HOME_LOCATION = "SET_HOME_ADDRESS";
export const SET_ALLOWED_RANGE = "SET_ALLOWED_RANGE";

const setHomeLocation = (location) => {
  return {
    type: SET_HOME_LOCATION,
    payload: { homeLocation: location }
  };
};

const setAllowedRange = (range) => {
  return {
    type: SET_ALLOWED_RANGE,
    payload: {allowedRange: range}
  };
};

export default {
  setHomeLocation: setHomeLocation,
  setAllowedRange
};
