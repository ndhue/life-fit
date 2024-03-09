import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: 'black',
        height: 100
      },
      tabBarItemStyle: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 5
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarActiveTintColor: Colors.primary
    }}>
      <Tabs.Screen
        name="activity/index"
        options={{
          title: 'Hoạt động',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="file-medical-alt" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="health/index"
        options={{
          title: 'Sức khỏe',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="book-medical" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="home" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="setting/index"
        options={{
          title: 'Cài đặt',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="gear" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Hồ sơ',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="user" color={color} size={25} />,
        }}
      />
    </Tabs>
  );
}