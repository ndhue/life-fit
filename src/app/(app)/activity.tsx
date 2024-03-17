import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import { useAppSelector } from "../../redux/store";
import {
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useEditActivityMutation,
  useGetActivityByDateQuery,
  useGetActivityQuery,
} from "../../controllers/api";
import { formatDate } from "../../toast/formatter";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../../constants/Colors";
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
import Checkbox from "../../components/Checkbox";
import { Modal } from "../../components/Modal";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

export default function TabActivityScreen() {
  const { token } = useAppSelector((state) => state.auth);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  const [itemList, setItemList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [editedActivity, setEditedActivity] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  const { data: activityList } = useGetActivityQuery(token);
  const { data: currentActivity } = useGetActivityByDateQuery({
    token,
    date: currentTime,
  });

  useEffect(() => {
    if (activityList) {
      const filterList = activityList?.result.filter(
        (activity) => formatDate(activity.date) !== formatDate(currentTime)
      );
      setItemList([...filterList].reverse());
    }
  }, [activityList]);

  useEffect(() => {
    if (currentActivity) {
      const array = [...currentActivity?.result].sort((a, b) => {
        if (a.goal === 0 && b.goal === 1) {
          return -1;
        }
        else if (a.goal === 1 && b.goal === 0) {
          return 1;
        }
        else {
          return 0;
        }
      });
      setSortedList(array);
    }
  }, [currentActivity]);

  const [createActivity] = useCreateActivityMutation();
  const [editActivity] = useEditActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Nhập tên hoạt động"),
    goal: yup.number().required('Không được để trống'),
    date: yup.date().required('Không được để trống'),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      date: new Date(),
      goal: 0,
    },
  });

  const handleEditActivity = async (data) => {
    try {
      const result = await editActivity({ id: editedActivity.id, token, data });
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

  const onSubmit = async (data) => {
    try {
      const result = await createActivity({ data, token });
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
    const editActivity = sortedList.find((item) => item.id === id) || {};
    setEditedActivity(editActivity);
    setValue("name", editActivity.name);
    setValue("date", editActivity.date);
    setValue("goal", editActivity.goal);
  };


  const handleDeleteActivity = async (id: number) => {
    try {
      const result = await deleteActivity({ id, token });
      console.log(result);
      
      if (result?.data.message === "Xoá thành công") {
        showToastSuccessDelete();
      } else {
        showToastErrorDelete();
      }
    } catch (error) {
      showToastErrorDelete();
    }
  };

  const renderActivityList = (rowData) => (
    <View
      style={[
        global.flexBox,
        { paddingVertical: 10, paddingHorizontal: 5, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: '#d1d1d1' },
      ]}
    >
      <View>
        <Text style={styles.text1}>{formatDate(rowData.item.date)}</Text>
        <Text style={styles.textActivity}>{rowData.item.name}</Text>
      </View>
      {rowData.item.goal !== 0 ? (
        <Text style={styles.statusSuccess}>Hoàn thành</Text>
      ) : (
        <Text style={styles.status}>Chưa hoàn thành</Text>
      )}
    </View>
  );

  const renderHiddenItem = (rowData, rowMap) => (
    <View style={[styles.hiddenContainer]} key={rowData.item.id}>
      <TouchableOpacity
        style={[
          styles.hiddenButton,
          { backgroundColor: `${Colors.secondary}` },
        ]}
        onPress={() => handleDeleteActivity(rowData.item.id)}
      >
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderCurrentActivity = (rowData) => (
    <View
      style={[global.flexBox, { paddingVertical: 10,borderBottomWidth: 1, borderBottomColor: '#d1d1d1', backgroundColor: "#fff"}]}
      key={rowData.item.id}
    >
      <Text
        style={
          rowData.item.goal
            ? styles.textFinished
            : styles.textUnfinished
        }
      >
        {rowData.item.name}
      </Text>
      <Checkbox activity={rowData.item} />
    </View>
  )

  const renderHiddenItemCurrent = (rowData, rowMap) => (
    <View style={[styles.hiddenContainer]} key={rowData.item.id}>
      <TouchableOpacity
        style={[styles.hiddenButtonEit, { backgroundColor: Colors.secondary }]}
        onPress={() => handleOpenEditModal(rowData.item.id)}
      >
        <AntDesign name="edit" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.hiddenButtonEit,
          { backgroundColor: 'black' },
        ]}
        onPress={() => handleDeleteActivity(rowData.item.id)}
      >
        <AntDesign name="delete" size={16} color="white" />
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
              <Header title="Hoạt động của tôi" />
              <View style={global.container}>
                <View style={[global.flexBox, { width: "90%" }]}>
                  <Text style={[styles.text1, { fontSize: 18 }]}>
                    {formatDate(currentTime)}
                  </Text>
                  <TouchableOpacity onPress={handleModal}>
                    <AntDesign
                      name="plussquareo"
                      size={24}
                      color={Colors.border}
                      
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.container, { height: 250 }]}>
                  <Text style={styles.textHistory}>Hoạt động hôm nay</Text>
              
                    {sortedList.length !== 0 ? (
                      <SwipeListView
                      data={sortedList}
                      renderItem={renderCurrentActivity}
                      renderHiddenItem={renderHiddenItemCurrent}
                      rightOpenValue={-130}
                      previewRowKey={"0"}
                      previewOpenValue={-40}
                      previewOpenDelay={3000}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                    ) : (
                        <Text style={[styles.textUnfinished, { paddingTop: 10, textAlign: 'center' }]}>
                          Chưa có hoạt động
                        </Text>
                    )}
                </View>
                <View style={[styles.container, { height: 250 }]}>
                  <Text style={styles.textHistory}>Lịch sử hoạt động</Text>
                    <SwipeListView
                      data={itemList}
                      renderItem={renderActivityList}
                      renderHiddenItem={renderHiddenItem}
                      rightOpenValue={-130}
                      previewRowKey={"0"}
                      previewOpenValue={-40}
                      previewOpenDelay={3000}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                </View>
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
                <Modal.Header title="Hoạt động" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={formatDate(new Date())}
                    editable={false}
                  />
                  <InputField
                    label="Tên hoạt động"
                    onChangeText={(t) => setValue("name", t)}
                  />
                  {errors.name && (
                    <Text style={global.error}>{errors.name.message}</Text>
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
                <Modal.Header title="Hoạt động" />
                <Modal.Body>
                  <InputField
                    label="Ngày cập nhật"
                    value={formatDate(getValues("date"))}
                    editable={false}
                  />
                  <InputField
                    label="Tên hoạt động"
                    onChangeText={(t) => setValue("name", t)}
                    defaultValue={getValues("name")}
                  />
                  {errors.name && (
                    <Text style={global.error}>{errors.name.message}</Text>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    title="Hoàn tất"
                    onPress={handleSubmit(handleEditActivity)}
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
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "white",
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
  textHistory: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 8
  },
  text1: {
    color: "#adadad",
    fontWeight: "500",
    fontSize: 12,
    paddingBottom: 4,
  },
  textActivity: {
    color: "#6e6e6e",
    fontSize: 15,
    fontWeight: "500",
  },
  status: {
    color: "#adadad",
    fontSize: 16,
    fontWeight: "600",
  },
  statusSuccess: {
    color: "#16de1d",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#90A5B433",
  },
  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
  },
  hiddenButtonEit: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    padding: 6,
  },
  textFinished: {
    color: "#adadad",
    fontSize: 15,
    textDecorationLine: "line-through",
  },
  textUnfinished: {
    color: "#6e6e6e",
    fontSize: 15,
    fontWeight: "500",
  },
});
