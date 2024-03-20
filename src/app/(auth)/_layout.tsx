import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import Colors from "../../constants/Colors";
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
      if (token) {
        dispatch(doSaveUser(token));
        return <Redirect href="/" />;
      }
    }
    getLoginId();
  }
  if (Platform.OS === "web") {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(doSaveUser(token));
      return <Redirect href="/" />;
    } 
  }

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="account-auth" options={{ headerShown: false }} />
    </Stack>
  );
}
