import { AsyncStorage } from 'react-native';

const HOME_LOCATION = 'HOME_LOCATION';
const ALLOWED_RANGE = 'ALLOWED_RANGE';


export const storeHomeLocation = async (location) => {
  try {
    await AsyncStorage.setItem(HOME_LOCATION, JSON.stringify(location));
  } catch (err) {
    console.log('Error storing home location', err);
  }
};

export const storeAllowedRange = async (range) => {
  try {
    await AsyncStorage.setItem(ALLOWED_RANGE, JSON.stringify(range));
  } catch (err) {
    console.log('Error storing home location', err);
  }
};

export const retrieveSavedState = async () => {
  try {
    const promises = [AsyncStorage.getItem(HOME_LOCATION), AsyncStorage.getItem(ALLOWED_RANGE)];
    const [homeLocation, allowedRange] = await Promise.all(promises);
    return {
      homeLocation: JSON.parse(homeLocation),
      allowedRange: JSON.parse(allowedRange)
    };
  } catch (err) {
    console.log('Error retrieving home location', err);
    return null;
  }
};
