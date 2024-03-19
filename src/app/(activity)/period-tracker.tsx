import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { router } from "expo-router";
import { useAppSelector } from "../../redux/store";
import {
  useCreatePeriodMutation,
  useEditPeriodMutation,
  useGetPeriodLengthCurrentQuery,
  useGetPeriodLengthPreviousQuery,
  useGetPeriodQuery,
} from "../../controllers/api";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { showToastErrorAdd, showToastErrorUpdate, showToastSuccessAdd, showToastSuccessUpdate } from "../../toast/toaster";
import { Modal } from "../../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const PeriodTracker = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEndModalVisible, setEndIsModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState({});
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [periodCurr, setPeriodCurr] = useState({});

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const { data: period } = useGetPeriodQuery(token);
  const { data: periodLengthCurrent } = useGetPeriodLengthCurrentQuery(token);
  const { data: periodLengthPrev } = useGetPeriodLengthPreviousQuery(token);

  useEffect(() => {
    if (period) {
      const updatedSelectedDays = {};
      period.period.forEach((period) => {
        const menstrualDaysArray = period.menstrual_days.split(",");
        menstrualDaysArray.forEach((day) => {
          updatedSelectedDays[day] = {
            selected: true,
            selectedColor: "#FF1E52",
          };
        });
      });
      setSelectedDays((prevState) => ({
        ...prevState,
        ...updatedSelectedDays,
      }));
    }
  }, [period]);

  useEffect(() => {
    if (periodLengthCurrent && period) {
      const find = period.period.find(p => p.id === periodLengthCurrent?.id);
      setPeriodCurr(find);
    }
  }, [period, periodLengthCurrent])
console.log(periodCurr);

  const schema = yup.object().shape({
    note: yup.string(),
    start_date: yup.string().required("Cập nhật thời gian"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      note: "",
      start_date: moment(new Date()).format("YYYY-MM-DD"),
    },
  });

  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const handleEndModal = () => setEndIsModalVisible(() => !isEndModalVisible);

  const [createPeriod] = useCreatePeriodMutation();
  const [editPeriod] = useEditPeriodMutation();

  const onChange = ({ type }, selectedDate: Date) => {
    if (type == "set") {
      setDate(selectedDate);
    } else {
      toggleDatePicker();
    }
  };

  const confirmDate = () => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setValue("start_date", formattedDate);
    toggleDatePicker();
  };

  const handleStartPeriod = async (data) => {
    try {
      const result = await createPeriod({ token, data });
      if (result?.data.message === "Thành công") {
        showToastSuccessAdd();
        handleModal();
      } else {
        showToastErrorAdd();
        handleModal();
      }
    } catch (error) {
      showToastErrorAdd();
      handleModal();
    }
  };

  const handleEndPeriod = async (data) => {
    try {
      const end = {
        ...periodCurr,
        note: data.note, 
        end_date: data.start_date
      }
      const result = await editPeriod({ token, id: periodLengthCurrent?.id ,data: end });
      if (result?.data.message === "Cập nhật thành công") {
        showToastSuccessUpdate();
        handleEndModal();
      } else {
        showToastErrorUpdate();
        handleEndModal();
      }
    } catch (error) {
      showToastErrorUpdate();
      handleEndModal();
    }
  };
  
  return (
    <>
      <ImageBackground
        source={bg}
        style={global.backgroundImage}
        resizeMode="cover"
      >
        <View style={global.wrapper}>
          <Header title="Chu kì kinh nguyệt" route="/" main={true} />
          <ScrollView>
            <View style={global.container}>
              <View style={styles.circle}>
                <View style={styles.line}>
                  <View style={styles.summarized}>
                    {periodLengthCurrent?.lengthperiod && isNaN(new Date(periodCurr.end_date)) ? (
                      <>
                        <Text style={styles.text1}>Kỳ kinh:</Text>
                        <Text style={styles.text2}>
                          Ngày {periodLengthCurrent?.lengthperiod}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.text1}>Chưa có dữ liệu</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={{ paddingVertical: 20 }}>
                {periodLengthCurrent?.lengthperiod && isNaN(new Date(periodCurr.end_date)) ? (
                  <LargeButton
                    variant="secondary"
                    title="Kết thúc chu kì"
                    onPress={() => {
                      handleEndModal();
                      setValue('start_date', moment(new Date()).format("YYYY-MM-DD"))
                    }}
                  />
                ) : (
                  <LargeButton
                    variant="secondary"
                    title="Thêm chu kì mới"
                    onPress={handleModal}
                  />
                )}
              </View>
              <Calendar
                monthFormat={"MM/yyyy"}
                markedDates={selectedDays}
                style={{ width: 348, marginTop: 20, borderRadius: 10 }}
                theme={{
                  todayTextColor: "#2d4150",
                  arrowColor: "#FF1E52",
                }}
                onDayPress={(day) => {
                  !periodLengthCurrent?.lengthperiod && setValue("start_date", day.dateString);
                  !periodLengthCurrent?.lengthperiod && handleModal();
                }}
              />
              <View style={styles.info}>
                <View style={[styles.borderInfo, global.flexBox]}>
                  <View>
                    <Text style={styles.subTitle}>Độ dài chu kì trước</Text>
                    <Text style={styles.subDetail}>36 ngày</Text>
                  </View>
                  <View>
                    <Text style={styles.conclusion}>BẤT THƯỜNG</Text>
                  </View>
                </View>
                <View style={[styles.borderInfo, global.flexBox]}>
                  <View>
                    <Text style={styles.subTitle}>Độ dài kỳ kinh trước</Text>
                    <Text style={styles.subDetail}>
                      {periodLengthPrev?.periodLengthDay ? periodLengthPrev?.periodLengthDay : 0} ngày
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.conclusion}>BÌNH THƯỜNG</Text>
                  </View>
                </View>
                <View style={[{ paddingVertical: 8 }, global.flexBox]}>
                  <View>
                    <Text style={styles.subTitle}>
                      Thay đổi về độ dài chu kỳ
                    </Text>
                    <Text style={styles.subDetail}>30-40 ngày</Text>
                  </View>
                  <View>
                    <Text style={styles.conclusion}>KHÔNG ĐỀU</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Modal Start */}
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
              <Modal.Header title="Nhập chu kì của bạn" />
              <Modal.Body>
                <InputField
                  label="Ngày bắt đầu"
                  placeholder="YYYY-MM-DD"
                  onPress={toggleDatePicker}
                  editable={false}
                  defaultValue={getValues("start_date")}
                  onChangeText={(t) => setValue("start_date", t)}
                />
                {errors.start_date && (
                  <Text style={global.error}>{errors.start_date.message}</Text>
                )}
                {showPicker && (
                  <View
                  style={{
                    height: 250,
                    top: -40,
                    bottom: 0,
                    margin: "auto",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    zIndex: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DateTimePicker
                    style={{
                      height: 180,
                      backgroundColor: 'white'
                    }}
                    textColor="black"
                    display="spinner"
                    value={date}
                    mode="date"
                    onChange={onChange}
                  />
                    <View
                      style={{
                        paddingHorizontal: 20,
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <Button title="Hủy" onPress={toggleDatePicker} />
                      <Button title="Xong" onPress={confirmDate} />
                    </View>
                  </View>
                )}
                {errors.start_date && (
                  <Text style={global.error}>{errors.start_date.message}</Text>
                )}

                <InputField
                  label="Mô tả"
                  onChangeText={(t) => setValue("note", t)}
                />
                {errors.note && (
                  <Text style={global.error}>{errors.note.message}</Text>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  title="Hoàn tất"
                  onPress={handleSubmit(handleStartPeriod)}
                />
              </Modal.Footer>
            </Modal.Container>
          </Modal>

          {/* Modal end */}
          <Modal isVisible={isEndModalVisible}>
            <Modal.Container>
              <AntDesign
                name="close"
                size={20}
                color={Colors.border}
                onPress={handleEndModal}
                style={{
                  textAlign: "right",
                  marginTop: 8,
                  marginRight: 8,
                }}
              />
              <Modal.Header title="Nhập chu kì của bạn" />
              <Modal.Body>
                <InputField
                  label="Ngày kết thúc"
                  placeholder="YYYY-MM-DD"
                  onPress={toggleDatePicker}
                  editable={false}
                  defaultValue={getValues("start_date")}
                  onChangeText={(t) => setValue("start_date", t)}
                />
                {errors.start_date && (
                  <Text style={global.error}>{errors.start_date.message}</Text>
                )}
                {showPicker && (
                  <View
                    style={{
                      height: 250,
                      top: -40,
                      bottom: 0,
                      margin: "auto",
                      position: "absolute",
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      zIndex: 9999,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DateTimePicker
                      style={{
                        height: 180,
                        backgroundColor: 'white'
                      }}
                      textColor="black"
                      display="spinner"
                      value={date}
                      mode="date"
                      onChange={onChange}
                    />
                    <View
                      style={{
                        paddingHorizontal: 20,
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <Button title="Hủy" onPress={toggleDatePicker} />
                      <Button title="Xong" onPress={confirmDate} />
                    </View>
                  </View>
                )}
                {errors.start_date && (
                  <Text style={global.error}>{errors.start_date.message}</Text>
                )}

                <InputField
                  label="Mô tả"
                  onChangeText={(t) => setValue("note", t)}
                />
                {errors.note && (
                  <Text style={global.error}>{errors.note.message}</Text>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  title="Hoàn tất"
                  onPress={handleSubmit(handleEndPeriod)}
                />
              </Modal.Footer>
            </Modal.Container>
          </Modal>
        </View>
      </ImageBackground>
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 250,
    height: 250,
    backgroundColor: "#FF1E52",
    borderRadius: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderColor: "white",
    borderWidth: 3,
    width: 225,
    height: 225,
    borderRadius: 225,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  summarized: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  text2: {
    fontSize: 38,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    paddingBottom: 10,
  },
  info: {
    width: "90%",
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
    fontWeight: "600",
  },
  subDetail: {
    fontWeight: "600",
    fontSize: 18,
  },
  conclusion: {
    color: "#6b6b6b",
    fontWeight: "700",
  },
});
export default PeriodTracker;
