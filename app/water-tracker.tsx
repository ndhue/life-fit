import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import Button from "../components/Button";

const WaterTracker = () => {
  return (
    <View style={global.wrapper}>
      <Header title="Mục tiêu của tôi" />
      <View style={global.container}>
        <View style={styles.water}>
          <Text style={styles.number}>8</Text>
        </View>
        <View style={{ paddingVertical: 20}}>
          
        </View>
        <View style={styles.fixedContainer}>
          <View style={{
            height: 5, 
            width: 60,
            backgroundColor: Colors.primary,
            position: 'absolute',
            left: (Dimensions.get('window').width / 2) - 25,
            top: 10
          }}/>
          <View style={{
            marginTop: 30,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center'
            }}>
              Mục tiêu uống nước
            </Text>
            <Text style={{
              color: '#90A5B4',
              textAlign: 'center',
              paddingTop: 8
            }}>
              Chúng tôi đã chuẩn vị một số mục tiêu cho bạn!
            </Text>
            <View style={styles.options}>
              <View style={styles.option}>
                <View style={{ padding: 15 }}>
                    <Text style={styles.optionTitle}>Ngày nóng</Text>
                  <View style={global.flexBox}>
                    <Text style={styles.optionTarget}>10 Ly</Text>
                    <Image source={require('../assets/images/coconut.png')} />
                  </View>
                </View>
              </View>

              <View style={styles.option}>
                  <View style={{ padding: 15 }}>
                      <Text style={styles.optionTitle}>Thể thao</Text>
                    <View style={global.flexBox}>
                      <Text style={styles.optionTarget}>7 Ly</Text>
                      <Image source={require('../assets/images/basketball.png')} />
                    </View>
                  </View>
              </View>

              <View style={styles.option}>
                  <View style={{ padding: 15 }}>
                      <Text style={styles.optionTitle}>Ngày lạnh</Text>
                    <View style={global.flexBox}>
                      <Text style={styles.optionTarget}>5 Ly</Text>
                      <Image source={require('../assets/images/cold.png')} />
                    </View>
                  </View>
                </View>

                <View style={styles.option}>
                  <View style={{ padding: 15 }}>
                      <Text style={styles.optionTitle}>Trẻ em</Text>
                    <View style={global.flexBox}>
                      <Text style={styles.optionTarget}>4 Ly</Text>
                      <Image source={require('../assets/images/rainbow.png')} />
                    </View>
                  </View>
                </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  water: {
    backgroundColor: Colors.primary,
    borderRightColor: 'black',
    borderRightWidth: 3,
    display: 'flex',
    alignItems: 'center',
  },
  number: {
    color: 'white',
    fontWeight: '700',
    fontSize: 80,
    paddingHorizontal: 25,
    borderRadius: 5
  },
  fixedContainer: {
    position: 'fixed',
    height: 352,
    width: '100%',
    backgroundColor: 'white',
    borderStartStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 25,
    gap: 15
  },
  option: {
    borderColor: '#D0DBE2',
    borderWidth: 1,
    borderRadius: 8,
    width: 153,
    height: 92
  },
  optionTitle: {
    color: '#90A5B4',
    fontSize: 14,
    paddingBottom: 10
  },
  optionTarget: {
    fontSize: 22,
    fontWeight: '600'
  }
})
export default WaterTracker;
