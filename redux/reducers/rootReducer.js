import { combineReducers } from "redux";
import location from "./location";
import settings from "./settings";
import errors from "./errors";

export default combineReducers(
  {
    settings, location, errors
  });
