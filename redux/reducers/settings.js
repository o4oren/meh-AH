import { SET_HOME_LOCATION, SET_ALLOWED_RANGE} from '../actions/settingsActions';
const settings = (state = {homeLocation: null, allowedRange: 100}, action) => {

  switch (action.type) {
    case SET_HOME_LOCATION:
      return { ...state, homeLocation: action.payload.homeLocation };
    case SET_ALLOWED_RANGE:
      return { ...state, allowedRange: action.payload.allowedRange };
    default:
      return state;
  }
};

export default settings;
