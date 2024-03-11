
import { Text, View } from 'react-native';
import { ErrorToast, SuccessToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400'
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
        fontWeight: '500'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),

  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};