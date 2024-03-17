import { ImageBackground, Platform, Text, View } from "react-native";
import ProfileButton from "../../components/ProfileButton";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { clearLoginId } from "../../controllers/secureStore";
import { router } from "expo-router";
import { useAppSelector } from "../../redux/store";

export default function TabSettingScreen() {
  const { profile } = useAppSelector(state => state.auth);

  const logOut = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      clearLoginId();
    }
    if (Platform.OS === 'web') {
      localStorage.removeItem('token');
      
    }
    router.replace('/signin');
  }

  return (
    <ImageBackground 
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <Header title="Cài đặt" route="/" />
        <View style={global.container}>
          <View
            style={{
              width: 120,
              height: 120,
              backgroundColor: "gray",
              borderRadius: 100,
            }}
          ></View>
          <Text style={{ fontSize: 20, fontWeight: "700", paddingTop: 10 }}>
            {profile.fullname}
          </Text>
          <View
            style={{
              paddingVertical: 25,
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
            <ProfileButton
              icon={<FontAwesome name="user" size={30} color="#FFD43B" />}
              text="Thay đổi mật khẩu"
              onPress={() => router.push('/change-password')}
            />
            <ProfileButton
              icon={<FontAwesome name="gear" size={30} color="#FFD43B" />}
              text="Cài đặt"
            />
            <ProfileButton
              icon={<AntDesign name="filetext1" size={30} color="#FFD43B" />}
              text="Chính sách & bảo mật"
            />
            <ProfileButton
              icon={<AntDesign name="logout" size={30} color="#FFD43B" />}
              text="Đăng xuất"
              onPress={logOut}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
