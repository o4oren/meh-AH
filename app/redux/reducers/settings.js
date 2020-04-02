import { SET_HOME_POSITION, SET_ALLOWED_RANGE} from '../actions/settingsActions';
const settings = (state = {homePosition: null, allowedRange: 100}, action) => {

  switch (action.type) {
    case SET_HOME_POSITION:
      return { ...state, homePosition: action.payload.homeLocation };
    case SET_ALLOWED_RANGE:
      return { ...state, allowedRange: action.payload.allowedRange };
    default:
      return state;
  }
};

export default settings;
