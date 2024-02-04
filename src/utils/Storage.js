import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};
const load = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};
const remove = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
export {save, load, remove};
