import { ImageBackground, ScrollView, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import ActivityContainer from "../../components/ActivityContainer";
import { global } from "../../constants/Global";

let texts: string[] = ["Giảm 20 calo", "Chạy 200 bước"];

export default function TabHomeScreen() {


  return (
    <ImageBackground 
      source={require('../../assets/images/background.png')} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <ScrollView>
          <HomeHeader />
          <View style={[global.container, { overflowY: 'auto', justifyContent: 'flex-start', paddingTop: 20 }]}>
            <ActivityContainer title='Hoạt động' text={texts} />
            <ActivityContainer title='Hoạt động' text={texts} />
            <ActivityContainer title='Hoạt động' text={texts} />
            <ActivityContainer title='Hoạt động' text={texts} />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
