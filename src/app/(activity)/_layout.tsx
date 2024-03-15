import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { LOGIN_ID_KEY } from "../../controllers/secureStore";
import { useAppDispatch } from "../../redux/store";
import { doSaveUser } from "../../redux/slices/authSlice";

export default function Layout() {
  const dispatch = useAppDispatch();
  if (Platform.OS === "ios" || Platform.OS === "android") {
    async function getLoginId() {
      const token = await SecureStore.getItemAsync(LOGIN_ID_KEY);
      if (!token) {
        return <Redirect href="/signin" />;
      } else {
        dispatch(doSaveUser(token));
      }
    }
    getLoginId();
  }
  if (Platform.OS === "web") {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Redirect href="/signin" />;
    } else {
      dispatch(doSaveUser(token));
    }
  }

  return (
    <Stack>
      <Stack.Screen name="period-tracker" options={{ headerShown: false }} />
      <Stack.Screen name="water-tracker" options={{ headerShown: false }} />
      <Stack.Screen name="eating-schedule" options={{ headerShown: false }} />
      <Stack.Screen name="edit-period" options={{ headerShown: false }} />
      <Stack.Screen name="eating-target" options={{ headerShown: false }} />
      <Stack.Screen name="edit-water-tracker" options={{ headerShown: false }} />
    </Stack>
  );
}
