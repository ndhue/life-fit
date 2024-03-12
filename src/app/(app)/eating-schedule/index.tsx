import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { bg, global } from "../../../constants/Global";
import Header from "../../../components/Header";
import LargeButton from "../../../components/LargeButton";
import { router } from "expo-router";
import { formatDate } from "../../../toast/formatter";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { useAppSelector } from "../../../redux/store";
import {
  useAddDetailDietMutation,
  useDeleteDetailDietMutation,
  useEditDetailDietMutation,
  useGetDietGoalQuery,
} from "../../../controllers/api";
import { SwipeListView } from "react-native-swipe-list-view";

const EatingSchedule = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [goal, setGoal] = useState({});
  const [sum, setSum] = useState(2000);
  const [selectedDate, setSelectedDate] = useState("2024-03-08");
  const [markedDates, setMarkedDates] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const { data } = useGetDietGoalQuery(token);

  const [addDetailDiet] = useAddDetailDietMutation();
  const [editDetailDiet] = useEditDetailDietMutation();
  const [deleteDetailDiet] = useDeleteDetailDietMutation();

  useEffect(() => {
    if (data) {
      setGoal(data);
    } else {
    }
  }, [data]);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    const newMarkedDates = { markedDates };
    newMarkedDates[date] = { selected: true, selectedColor: "#00FF66" };
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    handleDateSelect(selectedDate);
  }, []);

  const schema = yup.object().shape({
    content: yup.string().required("Hãy nhập mô tả bữa ăn của bạn"),
    diet_date: yup.date().required("Hãy chọn giờ ăn của bạn"),
    calo: yup.number().required("Hãy nhập calo của bữa ăn"),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: "",
      diet_date: new Date(),
      calo: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await addDetailDiet({ data, token });

      if (result?.data) {
        // showToastSuccessEditProfile();
        setTimeout(() => {
          router.replace("/profile");
        }, 1000);
      } else {
        // showToastErrorEditProfile();
      }
    } catch (error) {
      // showToastErrorEditProfile();
    }
  };

  // swipe to delete or edit
  const [itemList, setItemList] = useState([
    { key: "1", description: "Item 1" },
    { key: "2", description: "Item 2" },
    { key: "3", description: "Item 3" },
    { key: "4", description: "Item 1" },
    { key: "5", description: "Item 2" },
    { key: "6", description: "Item 3" },
  ]);

  const renderListMeal = (rowData) => (
      <View style={[styles.borderInfo, global.flexBox, { backgroundColor: 'white'}]}>
        <View>
          <Text style={styles.subTitle}>08:00 AM</Text>
          <Text style={styles.subDetail}>Meal</Text>
        </View>
        <View>
          <Text style={styles.conclusion}>60 kcal</Text>
        </View>
      </View>
  );

  const renderHiddenItem = (rowData, rowMap) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: Colors.secondary }]}
        onPress={() => {}}
      >
        <AntDesign name="edit" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: 'black' }]}
        onPress={() => {}}
      >
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header title="Chế độ dinh duỡng" />
        <View style={global.container}>
          <View style={styles.circle}>
            <View style={styles.line}>
              <View style={styles.summarized}>
                {goal.calo ? (
                  <>
                    <Text style={styles.text1}>Mục tiêu:</Text>
                    <Text style={styles.text2}>{goal.calo} kcal/ngày</Text>
                  </>
                ) : (
                  <Text style={styles.text2}>
                    Bạn vẫn chưa đặt mục tiêu hôm nay
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 20 }}>
            {!goal.calo && (
              <LargeButton
                variant="secondary"
                title="Đặt mục tiêu mới"
                onPress={() => router.replace("/activity/eating-target")}
              />
            )}
          </View>

          <View style={[global.flexBox, { width: "90%" }]}>
            <Text style={styles.datetime}>{formatDate(currentTime)}</Text>
            <AntDesign
              name="plussquareo"
              size={20}
              color={Colors.border}
              onPress={handleModal}
            />
          </View>

          <View style={styles.info}>
              <SwipeListView
                data={itemList}
                renderItem={renderListMeal}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-100}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                style={{
                  height: 120
                }}
              />
              <View
                style={[
                  global.flexBox,
                  {
                    position: "fixed",
                    bottom: 0,
                    borderWidth: 0,
                    width: "100%",
                    paddingTop: 20
                  },
                ]}
              >
                <Text style={styles.subDetail}>Tổng:</Text>
                <Text style={styles.conclusion}>{sum} kcal</Text>
              </View>
          </View>
        </View>
      </View>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <AntDesign
            name="close"
            size={20}
            color={Colors.border}
            onPress={handleModal}
            style={{
              textAlign: "right",
              marginTop: 8,
              marginRight: 8,
            }}
          />
          <Modal.Header title="Nhập bữa ăn của bạn" />
          <Modal.Body>
            <View>
              <Text style={[styles.label, { paddingBottom: 50 }]}>
                Thời gian
              </Text>
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(t) => setValue("diet_date", t)}
                style={{
                  position: "absolute",
                  left: -10,
                  top: 28,
                }}
              />
            </View>
            {errors.diet_date && (
              <Text style={global.error}>{errors.diet_date.message}</Text>
            )}

            <InputField
              label="Mô tả"
              onChangeText={(t) => setValue("content", t)}
            />
            {errors.content && (
              <Text style={global.error}>{errors.content.message}</Text>
            )}

            <InputField
              label="Số calo"
              onChangeText={(t) => setValue("calo", Number(t))}
            />
            {errors.calo && (
              <Text style={global.error}>{errors.calo.message}</Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              title="Hoàn tất"
              onPress={handleSubmit(onSubmit)}
            />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 204,
    height: 204,
    backgroundColor: "#00FF66",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderColor: "white",
    borderWidth: 3,
    width: 190,
    height: 190,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  summarized: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  text1: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    paddingBottom: 8,
  },
  text2: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 20,
  },
  datetime: {
    fontSize: 20,
    fontWeight: "600",
  },
  info: {
    width: "90%",
    minHeight: '45%',
    position: "relative",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
  },
  borderInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    paddingVertical: 8,
  },
  subTitle: {
    color: "#adadad",
    fontWeight: "500",
    fontSize: 15,
  },
  subDetail: {
    fontWeight: "600",
    fontSize: 18,
  },
  conclusion: {
    color: "#6b6b6b",
    fontWeight: "600",
    fontSize: 20,
  },
  label: {
    fontWeight: "600",
    textAlign: "left",
    fontSize: 15,
    paddingBottom: 5,
  },

  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 80,
    gap: 5
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#E74C3C", // Red
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default EatingSchedule;
