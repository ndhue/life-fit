import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { bg, global } from "../../../constants/Global";
import Header from "../../../components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabActivityScreen() {
  const navigateTo = (route: string) => {
    router.push(route);
  };

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header title="Hoạt động của tôi" />
        <View style={global.container}>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 15,
              backgroundColor: Colors.background2,
              width: 350,
              height: 120,
              padding: 10,
              marginVertical: 12,
            }}
          >
            <View style={[global.flexBox, { padding: 5 }]}>
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={styles.subTitle}>Chế độ dinh dưỡng</Text>
                  <Text style={styles.note}>note something</Text>
                </View>
                <Button
                  title="Xem"
                  variant="secondary"
                  onPress={() => navigateTo("/activity/eating-schedule")}
                />
              </View>
              <MaterialCommunityIcons
                name="bowl-mix"
                size={80}
                color="#0DB1AD66"
              />
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 15,
              backgroundColor: Colors.background2,
              width: 350,
              height: 120,
              padding: 10,
              marginVertical: 12,
            }}
          >
            <View style={[global.flexBox, { padding: 5 }]}>
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={styles.subTitle}>Nhắc nhở uống nước</Text>
                  <Text style={styles.note}>note something</Text>
                </View>
                <Button
                  title="Xem"
                  variant="secondary"
                  onPress={() => navigateTo("/activity/water-tracker")}
                />
              </View>
              <MaterialCommunityIcons
                name="water-outline"
                size={90}
                color="#197BD266"
              />
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 15,
              backgroundColor: Colors.background2,
              width: 350,
              height: 120,
              padding: 10,
              marginVertical: 12,
            }}
          >
            <View style={[global.flexBox, { padding: 5 }]}>
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={styles.subTitle}>Chu kì kinh nguyệt</Text>
                  <Text style={styles.note}>note something</Text>
                </View>
                <Button
                  title="Xem"
                  variant="secondary"
                  onPress={() => navigateTo("/activity/period-tracker")}
                />
              </View>
              <MaterialCommunityIcons name="flower" size={90} color="#D2416E66" />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 19,
    fontWeight: "700",
  },
  note: {
    fontSize: 13,
  },
});
