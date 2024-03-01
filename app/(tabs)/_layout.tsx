import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: 'black',
        height: '10%'
      },
      tabBarLabelStyle: {
        fontSize: 12,
        paddingBottom: 10
      },
      tabBarActiveTintColor: Colors.primary
    }}>
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Hoạt động',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="header" color={color} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Sức khỏe',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Cài đặt',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Hồ sơ',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="image" color={color} />,
        }}
      />
    </Tabs>
  );
}