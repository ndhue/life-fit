import { Text, View } from 'react-native';
import { global } from '../../constants/Styles';
import Header from '../../components/Header';

export default function TabHealthScreen() {
  return (
    <View style={global.wrapper}>
      <Header title='Hồ sơ sức khỏe' route="/" />
      <View style={global.container}>
      </View>
    </View>
  );
}
