import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";
import { bg, global } from "../../constants/Global";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import InputField from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  showToastErrorAdd,
  showToastErrorUpdate,
  showToastSuccessAdd,
  showToastSuccessUpdate,
} from "../../toast/toaster";
import {
  useGetDietGoalByDateQuery,
  useGetDietGoalQuery,
  useSetDietGoalMutation,
  useUpdateDietMutation,
} from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { formatDate } from "../../toast/formatter";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import Button from "../../components/Button";
import moment from "moment";

const CaloHistory = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [today] = useState(new Date().toISOString());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [currentHeart, setCurrentHeart] = useState({});
  const [editedHeart, setEditedHeart] = useState({});

  const { data: dietGoal } = useGetDietGoalQuery(token);
  const { data: currentDietDetail } = useGetDietGoalByDateQuery({
    token,
    date: moment(new Date()).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    if (dietGoal) {
      setItemList([...dietGoal?.result].reverse());
    }
  }, [dietGoal]);

  useEffect(() => {
    if (currentDietDetail) {
      setCurrentHeart(currentDietDetail?.result[0]);
    }
  }, [currentDietDetail]);

  const [createHeart] = useSetDietGoalMutation();
  const [updateDiet] = useUpdateDietMutation();

  const schema = yup.object().shape({
    date: yup.string().required("Không để thời gian trống"),
   goal: yup.number().required("Hãy nhập nhịp mục tiêu calo"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: moment(new Date()).format('YYYY-MM-DD'),
      goal: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createHeart({ data, token });

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

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const handleEditModal = () =>
    setIsEditModalVisible(() => !isEditModalVisible);

  const handleOpenEditModal = (id: number) => {
    setIsEditModalVisible(true);
    const editHeart = itemList.find((item) => item.id === id) || {};
    setEditedHeart(editHeart);
    setValue("date", moment(new Date(editHeart.date)).format('YYYY-MM-DD'));
    setValue("goal", editHeart.goal);
  };

  const handleEditHeart = async (data) => {
    try {
      const result = await updateDiet({ id: editedHeart.id, token, data });
      if (result?.data.message === "Cập nhật thành công") {
        showToastSuccessUpdate();
        setIsEditModalVisible(false);
      } else {
        showToastSuccessUpdate();
        setIsEditModalVisible(false);
      }
    } catch (error) {
      showToastErrorUpdate();
      setIsEditModalVisible(false);
    }
  };

  const renderListHeartRate = (rowData) => (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(rowData.item.date)}</Text>
      <View style={[global.flexBox, { justifyContent: "flex-start" }]}>
        <Text style={styles.text}>Calo cập nhật: </Text>
        <Text style={[styles.text, styles.static]}>
          {rowData.item.goal} Kcal
        </Text>
      </View>
    </View>
  );

  const renderHiddenItem = (rowData, rowMap) => (
    <View style={[styles.hiddenContainer]} key={rowData.item.id}>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: Colors.secondary }]}
        onPress={() => handleOpenEditModal(rowData.item.id)}
      >
        <AntDesign name="edit" size={20} color="white" />
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
              <Header title="Lịch sử calo" route="/health" main={true} />
              <View style={[global.container, { justifyContent: "center" }]}>
                <View style={styles.currentContainer}>
                  <View>
                    <View style={styles.detail}>
                    <MaterialIcons
                      name="local-fire-department"
                      size={20}
                      color="#0DB1AD"
                    />
                      <Text style={styles.title}>Calories</Text>
                    </View>

                    {currentHeart?.goal ? (
                      <View
                        style={[
                          styles.detail,
                          { alignItems: "baseline", gap: 2 },
                        ]}
                      >
                        <Text style={styles.staticCurrent}>
                          {currentHeart ? currentHeart?.goal : 0}
                        </Text>
                        <Text style={styles.type}>Kcal</Text>
                      </View>
                    ) : (
                      <>
                        <Text style={[styles.type, { fontSize: 14 }]}>Chưa cập nhật</Text>
                          <Pressable onPress={handleModal} style={styles.button}>
                          <Text style={{ color: "black", fontWeight: "500" }}>
                            Thêm
                          </Text>
                        </Pressable>
                      </>
                    )}
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.dateCurrent}>{formatDate(today)}</Text>
                    
                  </View>
                </View>

                <SwipeListView
                  data={itemList}
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
              <View style={{ paddingBottom: 20 }} />

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
                <Modal.Header title="Calo" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={moment(getValues("date")).format('YYYY-MM-DD')}
                    editable={false}
                  />
                  <InputField
                    label="Calo"
                    onChangeText={(t) => setValue("goal", Number(t))}
                  />
                  {errors.goal && (
                    <Text style={global.error}>{errors.goal.message}</Text>
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
                <Modal.Header title="Calo" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={moment(getValues("date")).format('YYYY-MM-DD')}
                    editable={false}
                  />
                  <InputField
                    label="Calo"
                    onChangeText={(t) => setValue("goal", Number(t))}
                    defaultValue={getValues("goal").toString()}
                  />
                  {errors.goalt && (
                    <Text style={global.error}>{errors.goal.message}</Text>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    title="Hoàn tất"
                    onPress={handleSubmit(handleEditHeart)}
                  />
                </Modal.Footer>
              </Modal.Container>
            </Modal>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  currentContainer: {
    marginTop: 20,
    width: "90%",
    height: 162,
    backgroundColor: "#0DB1AD33",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
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
    color: "#6b6b6b",
    fontSize: 18,
    fontWeight: "700",
  },
  text: {
    color: "#adadad",
    fontSize: 15,
  },
  static: {
    fontWeight: "700",
    fontSize: 16,
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
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  staticCurrent: {
    fontSize: 58,
    fontWeight: "700",
    color: "#0DB1AD",
  },
  type: {
    fontSize: 28,
    fontWeight: "500",
    color: "#0DB1AD",
  },
  dateCurrent: {
    color: "#525252",
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    paddingVertical: 8,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#fcfcfc99",
    position: "absolute",
    bottom: 0,
  },
});

export default CaloHistory;
