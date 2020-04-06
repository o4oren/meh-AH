import { NO_LOCATION_PERMISSIONS_ERROR} from '../actions/errorActions';

const error = (state = {
      error: true,
      errorType: null
    }, action) => {
  switch (action.type) {
    case NO_LOCATION_PERMISSIONS_ERROR:
      return {...state, errorType: action.payload.error} ;
    default:
      return state;
  }
};

export default error;
