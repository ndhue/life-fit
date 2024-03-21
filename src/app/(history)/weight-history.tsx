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
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import InputField from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
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
  useCreateWeightRecordMutation,
  useDeleteWeightRecordMutation,
  useEditWeightRecordMutation,
  useGetWeightRecordQuery,
} from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { formatDate, formatTime } from "../../toast/formatter";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import Button from "../../components/Button";

const WeightHistory = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [currentWeight, setCurrentWeight] = useState({});
  const [editedHeart, setEditedHeart] = useState({});

  const { data: weightHistory } = useGetWeightRecordQuery(token);

  useEffect(() => {
    if (weightHistory) {
      setItemList([...weightHistory?.result].reverse());
      setCurrentWeight([...weightHistory?.result].reverse()[0]);
    }
  }, [weightHistory]);

  const [createWeightRecord] = useCreateWeightRecordMutation();
  const [editWeightRecord] = useEditWeightRecordMutation();
  const [deleteWeightRecord] = useDeleteWeightRecordMutation();

  const schema = yup.object().shape({
    date_recorded: yup.date().required("Không để thời gian trống"),
    weight: yup.number().required("Hãy nhập cân nặng"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date_recorded: new Date(),
      weight: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createWeightRecord({ data, token });

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

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const handleEditModal = () =>
    setIsEditModalVisible(() => !isEditModalVisible);

  const handleOpenEditModal = (id: number) => {
    setIsEditModalVisible(true);
    const editWeight = itemList.find((item) => item.id === id) || {};
    setEditedHeart(editWeight);
    setValue("date_recorded", new Date(editWeight.date_recorded));
    setValue("weight", editWeight.weight);
  };

  const handleEditHeart = async (data) => {
    try {
      const result = await editWeightRecord({
        id: editedHeart.id,
        token,
        data,
      });

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
      const result = await deleteWeightRecord({ id, token });
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
      <Text style={styles.date}>{formatDate(rowData.item.date_recorded)}</Text>
      <View style={[global.flexBox, { justifyContent: "flex-start", paddingTop: 3 }]}>
        <Text style={styles.text}>Cân nặng cập nhật: </Text>
        <Text style={[styles.text, styles.static]}>
          {rowData.item.weight} kg
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
            <Header title="Lịch sử cân nặng" route="/health" main={true} />
            <View style={[global.container, { justifyContent: "center" }]}>
              <View style={styles.currentContainer}>
                <View>
                  <View style={styles.detail}>
                    <FontAwesome5 name="weight" size={20} color="#197BD2" />
                    <Text style={styles.title}>Cân nặng</Text>
                  </View>
                  {currentWeight?.weight ? (
                    <View
                      style={[
                        styles.detail,
                        { alignItems: "baseline", gap: 2 },
                      ]}
                    >
                      <Text style={styles.staticCurrent}>
                        {currentWeight?.weight}
                      </Text>
                      <Text style={styles.type}>kg</Text>
                    </View>
                  ) : (
                    <Text style={[styles.type, { fontSize: 20 }]}>
                      Chưa có lịch sử
                    </Text>
                  )}
                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                  <Text style={styles.dateCurrent}>
                    {currentWeight?.date_recorded &&
                      formatDate(currentWeight?.date_recorded)}
                  </Text>
                  <Pressable onPress={handleModal} style={styles.button}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      Thêm
                    </Text>
                  </Pressable>
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
                <Modal.Header title="Cân nặng" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={formatDate(new Date())}
                    editable={false}
                  />
                  <InputField
                    label="Cân nặng"
                    onChangeText={(t) => setValue("weight", Number(t))}
                  />
                  {errors.weight && (
                    <Text style={global.error}>{errors.weight.message}</Text>
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
                <Modal.Header title="Cân nặng" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={formatDate(getValues("date_recorded"))}
                    editable={false}
                  />
                  <InputField
                    label="Cân nặng"
                    onChangeText={(t) => setValue("weight", Number(t))}
                    defaultValue={getValues("weight").toString()}
                  />
                  {errors.weight && (
                    <Text style={global.error}>{errors.weight.message}</Text>
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
    backgroundColor: "#197BD233",
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
    color: "#197BD2",
  },
  type: {
    fontSize: 28,
    fontWeight: "500",
    color: "#197BD2",
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
    backgroundColor: "#fcfcfc",
    position: "absolute",
    bottom: 0,
  },
});

export default WeightHistory;
