import { View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import ActivityContainer from "../../components/ActivityContainer";
import { global } from "../../constants/Styles";

let texts: string[] = ["Giảm 20 calo", "Chạy 200 bước"];

export default function TabHomeScreen() {
  return (
    <View style={global.wrapper}>
      <HomeHeader />
      <View style={global.container}>
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
      </View>
    </View>
  );
}
