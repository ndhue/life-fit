import { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import InputField from "../../../components/InputField";
import { bg, global } from "../../../constants/Global";
import Header from "../../../components/Header";
import { useGetUserProfileQuery } from "../../../controllers/api";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { doSaveProfile } from "../../../redux/slices/authSlice";
import { formatDate, formatTime } from "../../../toast/formatter";

export default function TabProfileScreen() {
  const [profile, setProfile] = useState({
    email: "",
    fullname: "",
    birthday: "",
    gender: "",
    weight: 0,
    height: 0,
    wakeup_time: "",
    sleeping_time: "",
  });
  const { token } = useAppSelector((state) => state.auth);
  const { data } = useGetUserProfileQuery(token);
  
  const dispatch = useAppDispatch();

  const customGender = (gender: string) => {
    switch (gender) {
      case "female": {
        return "Nữ";
      }
      case "male": {
        return "Nam";
      }
      default:
        return "Khác";
    }
  };

  useEffect(() => {
    if (data) {
      setProfile({
        ...data[0],
        gender: customGender(data[0].gender),
        birthday: formatDate(new Date(data[0].birthday)),
        wakeup_time: formatTime(new Date(data[0].wakeup_time)),
        sleeping_time: formatTime(new Date(data[0].sleeping_time)),
      });
      dispatch(doSaveProfile(data[0]));
    }
  }, [data]);

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header title="Hồ sơ của tôi" edit={true} route="/" />
        <View style={global.container}>
          <View
            style={{
              width: 120,
              height: 120,
              backgroundColor: "gray",
              borderRadius: 100,
            }}
          ></View>
          <View style={{ marginBottom: 20, width: 339 }}>
            <InputField label="Email" editable={false} value={profile.email} />
            <InputField
              label="Họ và tên"
              editable={false}
              value={profile.fullname}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "48%" }}>
                <InputField
                  label="Ngày sinh"
                  editable={false}
                  value={profile.birthday}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Giới tính"
                  editable={false}
                  value={profile.gender}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "48%" }}>
                <InputField
                  label="Cân nặng"
                  subLabel="(kg)"
                  editable={false}
                  value={profile.weight.toString()}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Chiều cao"
                  subLabel="(cm)"
                  editable={false}
                  value={profile.height.toString()}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "48%" }}>
                <InputField
                  label="Giờ dậy"
                  editable={false}
                  value={profile.wakeup_time}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Giờ ngủ"
                  editable={false}
                  value={profile.sleeping_time}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
