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
      <Stack.Screen name="heart-history" options={{ headerShown: false }} />
      <Stack.Screen name="blood-pressure-history" options={{ headerShown: false }} />
      <Stack.Screen name="calo-history" options={{ headerShown: false }} />
      <Stack.Screen name="weight-history" options={{ headerShown: false }} />
    </Stack>
  );
}
