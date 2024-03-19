import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
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
import { router } from "expo-router";
import { useGetSumWaterByDateQuery, useGetWaterGoalByDatesQuery, useGetWaterHistoryByDateQuery, useSetWaterTrackerHistoryMutation} from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { formatTime } from "../../toast/formatter";
import { Modal } from "../../components/Modal";
import InputField from "../../components/InputField";
import moment from "moment";
import Button from "../../components/Button";
import { showToastErrorAdd, showToastSuccessAdd } from "../../toast/toaster";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";

const WaterTracker = () => {
  const { token } = useAppSelector(state => state.auth);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [today] = useState(new Date().toISOString());
  const [listGoal, setListGoal] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: waterGoal } = useGetWaterGoalByDatesQuery({ dategoal: moment(today).format('YYYY-MM-DD'), token });
  const { data: sumWater} = useGetSumWaterByDateQuery({ token, dategoal: moment(today).format('YYYY-MM-DD') });
  const { data: waterHisory } = useGetWaterHistoryByDateQuery({ token, dategoal: moment(today).format('YYYY-MM-DD') });

  const [setWaterTrackerHistory] = useSetWaterTrackerHistoryMutation();

  useEffect(() => {
    if(waterHisory) {
      setListGoal([...waterHisory?.result].reverse());    }
  }, [waterHisory]);

  useEffect(() => {
    if(waterGoal && waterGoal.result.length > 0) {
      setCurrentGoal(waterGoal.result[0]);
      setValue('watertracker_id', waterGoal.result[0].id);
      setValue('water', Math.ceil(waterGoal.result[0].watergoal / 8));
    }
  }, [waterGoal])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const schema = yup.object().shape({
    water: yup.number().required('Không được để trống'),
    time: yup.date().required('Không được để trống'),
    watertracker_id: yup.number().required('Không được để trống'),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      water: 0,
      time: new Date(),
      watertracker_id: 1,
    },
  });
  
  const onSubmit = async (data) => {
    try {
      const result = await setWaterTrackerHistory({ data: {...data, time: data.time.toISOString()}, token });
      console.log(result);
      
      if (result?.data) {
        showToastSuccessAdd();
        setIsModalVisible(false);
      } else {
        showToastErrorAdd();
        setIsModalVisible(false);
      }
    } catch (error) {
      showToastErrorAdd();
      setIsModalVisible(false);
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
          <Header title="Chế độ uống nước" route="/" main={true} />
          <View style={global.container}>
            <View style={styles.container}>
              <Image
                source={require("../../assets/images/water-dashboard.png")}
                style={styles.img}
              />
              <View style={styles.content}>
                <Text style={styles.time}>{formatTime(currentTime)}</Text>
                <Text style={styles.qty}>{getValues('water')}ml (1 ly)</Text>

                {!currentGoal && (
                    <View style={{ paddingTop: 40 }}>
                    <Pressable onPress={() => router.push('/edit-water-tracker')} style={styles.button}>
                      <Text style={{ color: 'black', fontWeight: '500' }}>Đặt mục tiêu</Text>
                    </Pressable>
                  </View>
                  )}

                 {!currentGoal?.watergoal || sumWater?.Sumwater < currentGoal?.watergoal  ? (
                  (
                    <View style={{ paddingTop: 40 }}>
                      <Pressable onPress={handleModal} style={styles.button}>
                        <Text style={{ color: 'black', fontWeight: '500' }}>Cập nhật nước đã uống</Text>
                      </Pressable>
                    </View>
                    )
                 ) : (
                  (
                    <View style={{ paddingTop: 40 }}>
                      <Pressable style={styles.button} disabled>
                        <Text style={{ color: 'black', fontWeight: '500' }}>Mục tiêu đã hoàn thành</Text>
                      </Pressable>
                    </View>
                    )
                 )} 
              </View>
            </View>

            <View style={styles.container}>
              <View>
                <Image source={require("../../assets/images/process.png")} />
                <Text style={[styles.target, { left: `${sumWater || sumWater?.watergoal < 1000 ? '18%' : '12%'}`}]}>{sumWater ? sumWater.Sumwater : 0}ml</Text>
              </View>

              <View style={styles.targetContainer}>
                <Text style={{ color: "#90A5B4", fontSize: 15 }}>Mục tiêu</Text>
                <Text style={{ fontSize: 22, fontWeight: "600", paddingTop: 10 }}>
                  { currentGoal.watergoal ? `${currentGoal.watergoal}ml` : '0ml' }
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <ScrollView>
                {listGoal && listGoal?.map((goal,index) => (
                  <View style={[styles.borderInfo, global.flexBox]} key={index}>
                  <View>
                    <Text style={styles.subTitle}>{formatTime(new Date(goal.time))}</Text>
                    <Text style={styles.subDetail}>{goal.water}ml</Text>
                  </View>
                  <View>
                    <Text style={styles.conclusion}>HOÀN THÀNH</Text>
                  </View>
                </View>
                ))}
                {listGoal.length === 0 && <Text style={[styles.subDetail, { textAlign: 'center'}]}>Chưa có lịch sử</Text>}

              </ScrollView>
            </View>
              {/* modal add */}
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
                  <Modal.Header title="Lịch sử uống nước" />
                  <Modal.Body>
                    <InputField
                      label="Ngày cập nhật"
                      value={moment(new Date()).format('YYYY-MM-DD hh:mm A')}
                      editable={false}
                    />
                    <InputField
                      label="Lượng nước đã uống"
                      subLabel="(ml)"
                      editable={false}
                      value={getValues('water').toString()}
                      defaultValue={getValues('water').toString()}
                      onChangeText={(t) => setValue("water", Number(t))}
                    />
                    {errors.water && (
                      <Text style={global.error}>{errors.water.message}</Text>
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
          </View>
        </View>
      </ImageBackground>
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: '90%',
    height: 180,
    borderRadius: 15,
    marginTop: 30
  },
  content: {
    position: "absolute",
    top: 15,
    left: 30,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  time: {
    fontSize: 28,
    fontWeight: "600",
  },
  qty: {
    fontSize: 16,
    color: "#90A5B4",
    fontWeight: "500",
  },
  target: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
    position: "absolute",
    top: "60%",
    left: "18%",
  },
  targetContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 160,
    position: "absolute",
    right: 0,
    top: "20%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "white",
  },
  info: {
    height: 280,
    width: '90%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20
  },
  borderInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    paddingVertical: 8
  },
  subTitle: {
    color: '#adadad',
    fontWeight: '600'
  },
  subDetail: {
    fontWeight: '600',
    fontSize: 18
  },
  conclusion: {
    color: '#6b6b6b',
    fontWeight: '700',
  }
});
export default WaterTracker;
