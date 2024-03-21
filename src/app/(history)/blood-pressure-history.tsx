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
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import InputField from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  showToastErrorAdd,
  showToastErrorDelete,
  showToastErrorUpdate,
  showToastSuccessAdd,
  showToastSuccessDelete,
  showToastSuccessUpdate,
} from "../../toast/toaster";
import {
  useCreateBloodPressureMutation,
  useDeleteBloodPressureMutation,
  useEditBloodPressureMutation,
  useGetBloodPressureByDateQuery,
  useGetBloodPressureQuery,
} from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { formatDate } from "../../toast/formatter";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import Button from "../../components/Button";
import moment from "moment";

const BloodPressureHistory = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [today] = useState(new Date().toISOString());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [currentBloodPressure, setCurrentBloodPressure] = useState({});
  const [editedBloodPressure, setEditedBloodPressure] = useState({});

  const { data: bloodPressureHistory } = useGetBloodPressureQuery(token);
  const { data: currentbloodPressure } = useGetBloodPressureByDateQuery({
    token,
    date: moment(today).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    if (bloodPressureHistory) {
      setItemList([...bloodPressureHistory?.result].reverse());
    }
  }, [bloodPressureHistory]);

  useEffect(() => {
    if (currentbloodPressure) {
      setCurrentBloodPressure(currentbloodPressure?.result[0]);
    }
  }, [currentbloodPressure]);

  const [createBloodPressure] = useCreateBloodPressureMutation();
  const [editBloodPressure] = useEditBloodPressureMutation();
  const [deleteBloodPressure] = useDeleteBloodPressureMutation();

  const schema = yup.object().shape({
    date: yup.date().required("Không để thời gian trống"),
    blood_pressure: yup.number().required("Hãy nhập huyết áp"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(),
      blood_pressure: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createBloodPressure({ data, token });

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
    setEditedBloodPressure(editHeart);
    setValue("date", new Date(editHeart.date));
    setValue("blood_pressure", editHeart.blood_pressure);
  };

  const handleEditBloodPressure = async (data) => {
    try {
      const result = await editBloodPressure({ id: editedBloodPressure.id, token, data });
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

  const handleDeleteHeart = async (id: number) => {
    try {
      const result = await deleteBloodPressure({ id, token });
      if (result?.data.message === "Xoá thành công") {
        showToastSuccessDelete();
      } else {
        showToastErrorDelete();
      }
    } catch (error) {
      showToastErrorDelete();
    }
  };

  const renderListHeartRate = (rowData) => (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(rowData.item.date)}</Text>
      <View style={[global.flexBox, { justifyContent: "flex-start", paddingTop: 3 }]}>
        <Text style={styles.text}>Huyết áp cập nhật: </Text>
        <Text style={[styles.text, styles.static]}>
          {rowData.item.blood_pressure} mmhg
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
        <AntDesign name="edit" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.hiddenButton, { backgroundColor: "black" }]}
        onPress={() => handleDeleteHeart(rowData.item.id)}
      >
        <AntDesign name="delete" size={24} color="white" />
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
              <Header title="Lịch sử huyết áp" route="/health" main={true} />
              <View style={[global.container, { justifyContent: "center" }]}>
                <View style={styles.currentContainer}>
                  <View>
                    <View style={styles.detail}>
                      <AntDesign name="hearto" size={20} color="#7042C9" />
                      <Text style={styles.title}>Huyết áp</Text>
                    </View>

                    {currentBloodPressure?.blood_pressure ? (
                      <View
                        style={[
                          styles.detail,
                          { alignItems: "baseline", gap: 2 },
                        ]}
                      >
                        <Text style={styles.staticCurrent}>
                          {currentBloodPressure ? currentBloodPressure?.blood_pressure : 0}
                        </Text>
                        <Text style={styles.type}>mmhg</Text>
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
                  rightOpenValue={-150}
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
                <Modal.Header title="Huyết áp" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={formatDate(new Date())}
                    editable={false}
                  />
                  <InputField
                    label="Huyết áp"
                    onChangeText={(t) => setValue("blood_pressure", Number(t))}
                  />
                  {errors.blood_pressure && (
                    <Text style={global.error}>{errors.blood_pressure.message}</Text>
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
                <Modal.Header title="Huyết áp" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={formatDate(getValues("date"))}
                    editable={false}
                  />
                  <InputField
                    label="Huyết áp"
                    onChangeText={(t) => setValue("blood_pressure", Number(t))}
                    defaultValue={getValues("blood_pressure").toString()}
                  />
                  {errors.blood_pressure && (
                    <Text style={global.error}>{errors.blood_pressure.message}</Text>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    title="Hoàn tất"
                    onPress={handleSubmit(handleEditBloodPressure)}
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
    backgroundColor: "#7042C933",
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
    fontSize: 17,
    fontWeight: "700",
  },
  text: {
    color: "#adadad",
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
    width: 70,
    height: 70
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
    fontSize: 62,
    fontWeight: "700",
    color: "#7042C9",
  },
  type: {
    fontSize: 28,
    fontWeight: "500",
    color: "#7042C9",
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

export default BloodPressureHistory;
