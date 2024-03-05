import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors';


type activityProps = {
  title: string;
  text: string[];
  img?: string;
}
const ActivityContainer = ({ title, text }: activityProps) => {
  return (
    <View style={{
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 15,
      backgroundColor: Colors.background2,
      width: 300,
      height: 120,
      padding: 10,
      marginVertical: 12
    }}>
      <Text 
        style={{ 
          fontWeight: '700', 
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>Image</Text>
        <View>
          {text.map((item, index) => (
            <Text 
              key={index}
              style={{ fontSize: 12 }}
            >
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}

export default ActivityContainer