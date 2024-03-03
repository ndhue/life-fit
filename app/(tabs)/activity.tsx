import { Image, StyleSheet, Text, View } from "react-native";
import { global } from "../../constants/Styles";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";
import { router } from 'expo-router';

export default function TabActivityScreen() {

  const navigateTo = (route: string) => {
    router.push(route);
  };

  return (
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
              <Button title="Xem" variant="secondary" onPress={() => navigateTo('/eating-schedule')} />
            </View>
            <Text>Image</Text>
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
              <Button title="Xem" variant="secondary" onPress={() => navigateTo('/water-tracker')} />
            </View>
            <Image source={require('../../assets/images/water-drop.png')} />
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
              <Button title="Xem" variant="secondary" onPress={() => navigateTo('/period-tracker')} />
            </View>
            <Image source={require('../../assets/images/flower.png')} />
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 19,
    fontWeight: "700",
  },
  note: {
    fontSize: 13
  }
});
