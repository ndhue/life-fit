import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { formatDate, formatTime } from "../../toast/formatter";
import Colors from "../../constants/Colors";
import { Modal } from "../../components/Modal";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useAppSelector } from "../../redux/store";
import {
  useAddDetailDietMutation,
  useDeleteDetailDietMutation,
  useEditDetailDietMutation,
  useGetCaloByDateQuery,
  useGetDetailDietByDateQuery,
  useGetDietGoalByDateQuery,
} from "../../controllers/api";
import {
  showToastErrorAdd,
  showToastErrorDelete,
  showToastErrorUpdate,
  showToastSuccessAdd,
  showToastSuccessDelete,
  showToastSuccessUpdate,
} from "../../toast/toaster";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import moment from "moment";

const EatingSchedule = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [goal, setGoal] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(formatDate(new Date()));
  const [today] = useState(new Date().toISOString());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  const { data } = useGetDietGoalByDateQuery({ token, date: moment(today).format('YYYY-MM-DD') });
  const { data: dietDetailData } = useGetDetailDietByDateQuery({
    token,
    diet_date: moment(today).format('YYYY-MM-DD'),
  });
  const { data: caloByDate } = useGetCaloByDateQuery({
    token,
    diet_date: today,
  });

  const [addDetailDiet] = useAddDetailDietMutation();
  const [editDetailDiet] = useEditDetailDietMutation();
  const [deleteDetailDiet] = useDeleteDetailDietMutation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatDate(new Date()));
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (dietDetailData) {
      setItemList(dietDetailData?.result);
    }
  }, [dietDetailData]);

  useEffect(() => {
    if (data) {
      setGoal(data?.result[0]);
    }
  }, [data]);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const handleEditModal = () =>
    setIsEditModalVisible(() => !isEditModalVisible);

  const handleOpenEditModal = (id: number) => {
    setIsEditModalVisible(true);
    const editDetail = itemList.find((item) => item.id === id) || {};
    setDataDetail(editDetail);
    setValue("content", editDetail?.content);
    setValue("diet_date", new Date(editDetail.diet_date));
    setValue("calo", editDetail.calo);
    setSelectedDate(new Date(editDetail.diet_date));
  };

  const handleEditDetail = async (data) => {
    try {
      const result = await editDetailDiet({ id: dataDetail.id, token, data });   
      if (result?.data.message === "Cập nhật thành công") {
        
        showToastSuccessUpdate();
        setTimeout(() => {
          setIsEditModalVisible(false);
        }, 1000);
      } else {
        showToastErrorUpdate();
        setTimeout(() => {
          setIsEditModalVisible(false);
        }, 1000);
      }
    } catch (error) {
      showToastErrorUpdate();
      setTimeout(() => {
        setIsEditModalVisible(false);
      }, 1000);
    }
  };

  const handleDeleteDetail = async (id: number) => {
    try {
      const result = await deleteDetailDiet({ id, token });
      if (result?.data.message === "Xoá thành công") {
        showToastSuccessDelete();
      } else {
        showToastErrorDelete();
      }
    } catch (error) {
      showToastErrorDelete();
    }
  };

  const schema = yup.object().shape({
    content: yup.string().required("Hãy nhập mô tả bữa ăn của bạn"),
    diet_date: yup.date().required("Hãy chọn giờ ăn của bạn"),
    calo: yup.number().required("Hãy nhập calo của bữa ăn"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
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
        showToastSuccessAdd();
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
      } else {
        showToastErrorAdd();
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
      }
    } catch (error) {
      showToastErrorAdd();
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000);
    }
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    setSelectedDate(selectedTime);
    setValue("diet_date", selectedTime);
  };

  const renderListMeal = (rowData) => (
    <View
      style={[styles.borderInfo, global.flexBox, { backgroundColor: "white" }]}
      key={rowData.item.id}
    >
      <View>
        <Text style={styles.subTitle}>
          {formatTime(rowData.item.diet_date)}
        </Text>
        <Text style={styles.subDetail}>{rowData.item.content}</Text>
      </View>
      <View>
        <Text style={styles.conclusion}>{rowData.item.calo} kcal</Text>
      </View>
    </View>
  );

  const renderHiddenItem = (rowData, rowMap) => (
    <View style={styles.hiddenContainer} key={rowData.item.id}>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: Colors.secondary }]}
        onPress={() => handleOpenEditModal(rowData.item.id)}
      >
        <AntDesign name="edit" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: "black" }]}
        onPress={() => handleDeleteDetail(rowData.item.id)}
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
            <Header title="Chế độ dinh duỡng" route="/" main={true} />
            <View style={global.container}>
              <View style={styles.circle}>
                <View style={styles.line}>
                  <View style={styles.summarized}>
                    {goal ? (
                      <>
                        <Text style={styles.text1}>Mục tiêu:</Text>
                        <Text style={styles.text2}>{goal.goal} kcal/ngày</Text>
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
                {!goal && (
                  <LargeButton
                    variant="secondary"
                    title="Đặt mục tiêu mới"
                    onPress={() => router.replace("/eating-target")}
                  />
                )}
              </View>

              <View style={[global.flexBox, { width: "90%" }]}>
                <Text style={styles.datetime}>{currentTime}</Text>
                {goal && (
                  <AntDesign
                    name="plussquareo"
                    size={20}
                    color={Colors.border}
                    onPress={handleModal}
                  />
                )}
              </View>

              <View style={styles.info}>
                {itemList.length !== 0 ? (
                  <>
                    <SwipeListView
                      data={itemList}
                      renderItem={renderListMeal}
                      renderHiddenItem={renderHiddenItem}
                      rightOpenValue={-100}
                      previewRowKey={"0"}
                      previewOpenValue={-40}
                      previewOpenDelay={3000}
                      style={{
                        height: 120,
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
                          paddingTop: 20,
                        },
                      ]}
                    >
                      <Text style={styles.subDetail}>Tổng:</Text>
                      <Text style={styles.conclusion}>
                        {caloByDate?.SumCalo} kcal
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text style={[styles.text2, { color: "black" }]}>
                    Đặt mục tiêu hôm nay để cập nhật chi tiết dinh dưỡng của bạn
                  </Text>
                )}
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
                    onChange={handleTimeChange}
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

          {/* modal edit */}
          <Modal isVisible={isEditModalVisible}>
            <Modal.Container>
              <AntDesign
                name="close"
                size={20}
                color={Colors.border}
                onPress={handleEditModal}
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
                    value={selectedDate}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                    style={{
                      position: "absolute",
                      left: -10,
                      top: 28,
                    }}
                  />
                </View>

                <InputField
                  label="Mô tả"
                  onChangeText={(t) => setValue("content", t)}
                  defaultValue={getValues("content")}
                />

                <InputField
                  label="Số calo"
                  onChangeText={(t) => setValue("calo", Number(t))}
                  defaultValue={getValues("calo").toString()}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  title="Hoàn tất"
                  onPress={handleSubmit(handleEditDetail)}
                />
              </Modal.Footer>
            </Modal.Container>
          </Modal>
        </ImageBackground>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </>
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
    minHeight: "45%",
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
    fontSize: 17,
    paddingTop: 5
  },
  conclusion: {
    color: "#6b6b6b",
    fontWeight: "600",
    fontSize: 18,
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
    gap: 5,
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
