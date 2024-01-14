import { Button, Text, View } from 'react-native';
import { styles } from '../../constants/Styles';
import ProfileButton from '../../components/ProfileButton';

export default function TabSettingScreen() {
  const handleButtonPress = () => {
    // Your button press logic here
    console.log('Button pressed!');
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
      <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: "gray",
            borderRadius: 100,
          }}
        ></View>
        <Text style={{ fontSize: 20, fontWeight: "700", paddingTop: 10 }}>
            Antonnia Antonnia
          </Text>
        <View style={{
          paddingVertical: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 15
        }}>
          <ProfileButton 
            text='Hồ sơ'
            onPress={handleButtonPress}
          />
          <ProfileButton 
            text='Cài đặt'
            onPress={handleButtonPress}
          />
          <ProfileButton 
            text='Chính sách & bảo mật'
            onPress={handleButtonPress}
          />
          <ProfileButton 
            text='Đăng xuất'
            onPress={handleButtonPress}
          />
        </View>
        
      </View>
    </View>
  );
}
