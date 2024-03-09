import { ImageBackground, Platform, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import ActivityContainer from "../../components/ActivityContainer";
import { global } from "../../constants/Global";
import { Redirect } from "expo-router";
import { useAppSelector } from "../../redux/store";
import { getLoginId } from "../../controllers/secureStore";

let texts: string[] = ["Giảm 20 calo", "Chạy 200 bước"];

export default function TabHomeScreen() {
  const { token } = useAppSelector(state => state.auth);
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    getLoginId();
  }

  if (!token) return <Redirect href='/signin' />

  return (
    <ImageBackground 
      source={require('../../assets/images/background.png')} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <HomeHeader />
        <View style={[global.container, { overflowY: 'auto', justifyContent: 'flex-start', paddingTop: 20 }]}>
          <ActivityContainer title='Hoạt động' text={texts} />
          <ActivityContainer title='Hoạt động' text={texts} />
          <ActivityContainer title='Hoạt động' text={texts} />
          <ActivityContainer title='Hoạt động' text={texts} />
        </View>
      </View>
    </ImageBackground>
  );
}
