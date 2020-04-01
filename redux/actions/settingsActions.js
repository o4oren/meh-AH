export const SET_HOME_POSITION = "SET_HOME_ADDRESS";
export const SET_ALLOWED_RANGE = "SET_ALLOWED_RANGE";

const setHomePosition = (position) => {
  return {
    type: SET_HOME_POSITION,
    payload: { homeLocation: position }
  };
};

const setAllowedRange = (range) => {
  return {
    type: SET_ALLOWED_RANGE,
    payload: {allowedRange: range}
  };
};

export default {
  setHomePosition: setHomePosition,
  setAllowedRange
};
