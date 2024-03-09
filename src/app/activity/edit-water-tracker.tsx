import React, { useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";

const EditWaterTracker = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const pickerRef = useRef();

  const open = () => {
    pickerRef.current.focus();
  };

  const close = () => {
    pickerRef.current.blur();
  };
  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header
          title="Mục tiêu của tôi"
          main={true}
          route="/activity/water-tracker"
        />
        <View style={global.container}>
          <View style={styles.water}>
            <Text style={styles.number}>8</Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Picker
              ref={pickerRef}
              selectedValue={selectedOption}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOption(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item
                style={styles.pickerOption}
                label="4 ly (800ml)"
                value="800"
              />
              <Picker.Item
                style={styles.pickerOption}
                label="6 ly (1200ml)"
                value="1200"
              />
              <Picker.Item
                style={styles.pickerOption}
                label="8 ly (1600ml)"
                value="1600"
              />
              <Picker.Item
                style={styles.pickerOption}
                label="10 ly (2000ml)"
                value="2000"
              />
              <Picker.Item
                style={styles.pickerOption}
                label="12 ly (2400ml)"
                value="2400"
              />
            </Picker>
          </View>
        </View>
        <View style={styles.fixedContainer}>
          <View
            style={{
              height: 5,
              width: 60,
              backgroundColor: Colors.primary,
              position: "absolute",
              left: Dimensions.get("window").width / 2 - 25,
              top: 10,
            }}
          />
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Mục tiêu uống nước
            </Text>
            <Text
              style={{
                color: "#90A5B4",
                textAlign: "center",
                paddingTop: 8,
              }}
            >
              Chúng tôi đã chuẩn vị một số mục tiêu cho bạn!
            </Text>
            <View style={styles.options}>
              <View style={styles.option}>
                <View style={{ padding: 15 }}>
                  <Text style={styles.optionTitle}>Ngày nóng</Text>
                  <View style={global.flexBox}>
                    <Text style={styles.optionTarget}>10 Ly</Text>
                    <Image
                      source={require("../../assets/images/coconut.png")}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.option}>
                <View style={{ padding: 15 }}>
                  <Text style={styles.optionTitle}>Thể thao</Text>
                  <View style={global.flexBox}>
                    <Text style={styles.optionTarget}>7 Ly</Text>
                    <Image
                      source={require("../../assets/images/basketball.png")}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.option}>
                <View style={{ padding: 15 }}>
                  <Text style={styles.optionTitle}>Ngày lạnh</Text>
                  <View style={global.flexBox}>
                    <Text style={styles.optionTarget}>5 Ly</Text>
                    <Image source={require("../../assets/images/cold.png")} />
                  </View>
                </View>
              </View>

              <View style={styles.option}>
                <View style={{ padding: 15 }}>
                  <Text style={styles.optionTitle}>Trẻ em</Text>
                  <View style={global.flexBox}>
                    <Text style={styles.optionTarget}>4 Ly</Text>
                    <Image
                      source={require("../../assets/images/rainbow.png")}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderColor: Colors.border,
    borderRadius: 8,
    width: 240,
    padding: 15,
    fontSize: 18,
  },
  pickerOption: {
    paddingLeft: 8,
  },
  water: {
    backgroundColor: Colors.primary,
    borderRightColor: "black",
    borderRightWidth: 3,
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  number: {
    color: "white",
    fontWeight: "700",
    fontSize: 80,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  fixedContainer: {
    position: "fixed",
    height: 350,
    width: "100%",
    backgroundColor: "white",
    borderStartStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
  },
  options: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 25,
    paddingTop: 10,
  },
  option: {
    borderColor: "#D0DBE2",
    borderWidth: 1,
    borderRadius: 8,
    width: "45%",
    height: 92,
    marginTop: 15,
  },
  optionTitle: {
    color: "#90A5B4",
    fontSize: 14,
    paddingBottom: 10,
  },
  optionTarget: {
    fontSize: 22,
    fontWeight: "600",
  },
});
export default EditWaterTracker;
