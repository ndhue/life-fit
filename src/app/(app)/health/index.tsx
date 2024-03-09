import { Image, ImageBackground, Text, View } from 'react-native';
import { bg, global } from '../../../constants/Global';
import Header from '../../../components/Header';

export default function TabHealthScreen() {
  return (
    <ImageBackground 
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        

        
        <Header title='Hồ sơ sức khỏe' route="/" />
        <View style={global.container}>
        </View>
      </View>
    </ImageBackground>
  );
}
