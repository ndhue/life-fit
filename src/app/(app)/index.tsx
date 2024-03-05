import { Button, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import ActivityContainer from "../../components/ActivityContainer";
import { global } from "../../constants/Global";
import { router } from "expo-router";

let texts: string[] = ["Giảm 20 calo", "Chạy 200 bước"];

export default function TabHomeScreen() {
  return (
    <View style={global.wrapper}>
      <HomeHeader />
      <Button onPress={() => router.push('/signup')} title="hi" />
      <View style={[global.container, { overflowY: 'auto', justifyContent: 'flex-start', paddingTop: 20 }]}>
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
      </View>
    </View>
  );
}
