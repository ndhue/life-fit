import * as SecureStore from 'expo-secure-store';
export const LOGIN_ID_KEY = 'loginId';

export async function save(value: string) {
  await SecureStore.setItemAsync(LOGIN_ID_KEY, value);
}

export async function getLoginId() {
  let result = await SecureStore.getItemAsync(LOGIN_ID_KEY);

  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    
    alert('No values stored under that key.');
    return null;
  }
}

export async function clearLoginId() {
  await SecureStore.deleteItemAsync(LOGIN_ID_KEY);
}