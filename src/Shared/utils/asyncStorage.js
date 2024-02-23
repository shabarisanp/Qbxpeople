import AsyncStorage from '@react-native-community/async-storage';

/**
 * Get data from local storage.
 *
 * @param {string} key - Storage key
 */

const setData = async (key, value) => {
  // console.log('hari>>setLocation>>', key, value);
  try {
    if (value) {
      await AsyncStorage.setItem(key, JSON.stringify(value));

      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
const getData = async key => {
  try {
    const item = await AsyncStorage.getItem(key);
    // console.log('hari>>getdata>>', JSON.parse(item));
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Set data to local storage.
 *
 * @param {string} key - Storage key
 * @param {object} value - Storage value
 */

/**
 * Remove data from local storage.
 *
 * @param {string} key - Storage key
 */
const removeData = key => {
  try {
    AsyncStorage.removeItem(key);

    return true;
  } catch (error) {
    return false;
  }
};

const Storage = {
  getData,
  setData,
  removeData,
};

export default Storage;
