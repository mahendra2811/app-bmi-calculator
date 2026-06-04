import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading data:', e);
    return null;
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
}

export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data:', e);
  }
}
