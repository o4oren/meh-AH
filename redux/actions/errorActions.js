export const NO_LOCATION_PERMISSIONS_ERROR = "NO_LOCATION_PERMISSIONS_ERROR";

const noLocationPermissionsError = () => {
  return {
    type: NO_LOCATION_PERMISSIONS_ERROR,
  };
};

export default {
  noLocationPermissionsError
};
