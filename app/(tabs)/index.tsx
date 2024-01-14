import { View } from "react-native";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";
import ActivityContainer from "../../components/ActivityContainer";
import { styles } from "../../constants/Styles";

let texts: string[] = ["Giảm 20 calo", "Chạy 200 bước"];

export default function TabHomeScreen() {
  return (
    <View style={styles.wrapper}>
      <Header />
      <View style={styles.container}>
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
        <ActivityContainer title='Hoạt động' text={texts} />
      </View>
    </View>
  );
}
