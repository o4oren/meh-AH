import { AsyncStorage } from 'react-native';

const HOME_LOCATION = 'HOME_LOCATION';

export const storeHomeLocation = async (location) => {
  try {
    await AsyncStorage.setItem(HOME_LOCATION, JSON.stringify(location));
  } catch (err) {
    console.log('Error storing home location', err);
  }
};

export const retrieveHomeLocation = async () => {
  try {
    const value = await AsyncStorage.getItem(HOME_LOCATION);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (err) {
    console.log('Error retrieving home location', err);
    return null;
  }
};
