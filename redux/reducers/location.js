import {
  UPDATE_CURRENT_POSITION,
  EXCEED_ALLOWED_RANGE,
  RETURN_TO_ALLOWED_RANGE,
  UPDATE_DISTANCE
} from '../actions/locationActions';

const location = (state = { prevPosition: null, currentPosition: null, isInRange: true, distance: 0},
                  action) => {
  switch (action.type) {
    case UPDATE_CURRENT_POSITION:
      return {...state, currentPosition: action.payload.currentPosition};
    case EXCEED_ALLOWED_RANGE:
      return { ...state, isInRange: false };
    case RETURN_TO_ALLOWED_RANGE:
      return { ...state, isInRange: true };
    case UPDATE_DISTANCE:
      return { ...state, distance: action.payload.distance };
    default:
      return state;
  }
};

export default location;
