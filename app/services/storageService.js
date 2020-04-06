import { AsyncStorage } from 'react-native';

const HOME_POSITION = 'HOME_POSITION';
const ALLOWED_RANGE = 'ALLOWED_RANGE';


export const storeHomePosition = async (position) => {
  try {
    await AsyncStorage.setItem(HOME_POSITION, JSON.stringify(position));
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
    const promises = [AsyncStorage.getItem(HOME_POSITION), AsyncStorage.getItem(ALLOWED_RANGE)];
    const [homePosition, allowedRange] = await Promise.all(promises);
    return {
      homePosition: JSON.parse(homePosition),
      allowedRange: JSON.parse(allowedRange)
    };
  } catch (err) {
    console.log('Error retrieving home location', err);
    return null;
  }
};
