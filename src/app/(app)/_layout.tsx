import { FontAwesome5, FontAwesome, MaterialIcons, Feather} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { Redirect } from "expo-router";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { LOGIN_ID_KEY } from "../../controllers/secureStore";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { doSaveProfile, doSaveUser } from "../../redux/slices/authSlice";
import { useGetUserProfileQuery } from "../../controllers/api";

export default function TabLayout() {
  const { profile } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    async function getLoginId() {
      const token = await SecureStore.getItemAsync(LOGIN_ID_KEY);
      if (!token) {
        return <Redirect href="/signin" />;
      } else {
        dispatch(doSaveUser(token));
        const { data } = useGetUserProfileQuery(token);
        if (data) {
          dispatch(doSaveProfile(data.result[0]));
        }
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
      const { data } = useGetUserProfileQuery(token);
      if (data) {
        if (data?.result[0].gender) { 
          dispatch(doSaveProfile(data?.result[0]));
        } else {
          return <Redirect href="/set-up-profile" />
        }
      }
    }
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          height: 100,
        },
        tabBarItemStyle: {
          display: "flex",
          flexDirection: "column",
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: Colors.primary,
      }}
    >

      <Tabs.Screen
        name="health"
        options={{
          title: "Sức khỏe",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="file-medical-alt" color={color} size={25}  />
          ),
        }}
      /> 
      <Tabs.Screen
        name="activity"
        options={{
          title: "Hoạt động",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="activity" color={color} size={25} />
          ),
        }}
      /> 
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Hồ sơ",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={25} />
          ),
        }}
      />
           <Tabs.Screen
        name="setting"
        options={{
          title: "Cài đặt",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
