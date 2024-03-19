import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGetNotiQuery } from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";

const Notification = () => {
  const { token } = useAppSelector(state => state.auth);
  const { data } = useGetNotiQuery(token);

  const [notiList, setNotiList] = useState();
  useEffect(() => {
    if(data) {
      setNotiList([...data?.result].reverse());
    } 
  }, [data]);

  const renderListHeartRate = (rowData) => (
    <View style={styles.container}>
      <Text style={styles.date}>{moment(rowData.item.time_noti).format('DD/MM/YYYY hh:mm A')}</Text>
      <View style={[global.flexBox, { justifyContent: "flex-start" }]}>
        <Text style={styles.text}>{rowData.item.content}</Text>
      </View>
    </View>
  );

  const renderHiddenItem = (rowData, rowMap) => (
    <View style={[styles.hiddenContainer]} key={rowData.item.id}>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: "black" }]}
        // onPress={() => handleDeleteHeart(rowData.item.id)}
      >
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios" || Platform.OS === "android"
            ? "padding"
            : "height"
        }
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={bg}
          style={global.backgroundImage}
          resizeMode="cover"
        >
          <View style={global.wrapper}>
            <View
              style={[
                global.flexBox,
                {
                  paddingTop: 50,
                  paddingBottom: 20,
                  paddingHorizontal: 20,
                },
              ]}
            >
              <AntDesign
                name="arrowleft"
                size={25}
                color="#FFD43B"
                onPress={() => router.back()}
              />
              <Text style={global.title}>Thông báo</Text>
              <View style={{ width: 20 }} />
            </View>
            <View style={[global.container, { justifyContent: "center" }]}>
              <SwipeListView
                    data={notiList}
                    renderItem={renderListHeartRate}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-130}
                    previewRowKey={"0"}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    style={{
                      width: "90%",
                      height: "auto",
                    }}
                  />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "grey",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  date: {
    color: "#adadad",
    fontSize: 14,
    fontWeight: "500",
  },
  text: {
    color: "#6b6b6b",
    fontSize: 15,
  },
  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    paddingVertical: 20,
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 20,
  },
});


export default Notification;
