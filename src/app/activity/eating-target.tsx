import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { bg, global } from '../../constants/Global';
import Header from '../../components/Header';
import ActivityContainer from '../../components/ActivityContainer';
import Colors from '../../constants/Colors';

let texts: string[] = ["Giảm 20 calo", "Chạy 200 bước"];
const EatingTarget = () => {
  return (
    <ImageBackground
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <Header title="Chế độ ăn" route="/activity/eating-schedule" main={true} />
        <View style={global.container}>
          <View style={[global.container, { overflowY: 'auto', justifyContent: 'flex-start', paddingTop: 20 }]}>
            <ActivityContainer title='Hoạt động' text={texts} />
            <View style={styles.newTarget}>
              <Text style={styles.targetTitle}>NHẬP MỤC TIÊU</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  newTarget: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    backgroundColor: Colors.background2,
    width: 300,
    height: 374,
    padding: 10,
    marginVertical: 12
  },
  targetTitle: {
    fontWeight: '700', 
    fontSize: 16,
    textAlign: 'center',
  }
})

export default EatingTarget