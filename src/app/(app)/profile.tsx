import { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import InputField from "../../components/InputField";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import { useGetUserProfileQuery } from "../../controllers/api";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { doSaveProfile } from "../../redux/slices/authSlice";
import { formatDate, formatTime } from "../../toast/formatter";

export default function TabProfileScreen() {

  const { token, profile } = useAppSelector((state) => state.auth);
  const { data } = useGetUserProfileQuery(token);
  const dispatch = useAppDispatch();
console.log(data.result[0]);

  useEffect(() => {
    if (data) {
      dispatch(doSaveProfile(data.result[0]));
    }
  }, [data]);
  
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

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header title="Hồ sơ của tôi" edit={true} />
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
                  value={formatDate(profile.birthday)}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Giới tính"
                  editable={false}
                  value={customGender(profile.gender) || ""}
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
                  value={profile.weight.toString() || 0}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Chiều cao"
                  subLabel="(cm)"
                  editable={false}
                  value={profile.height.toString() || 0}
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
                  value={formatTime(profile.wakeup_time) || ""}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Giờ ngủ"
                  editable={false}
                  value={formatTime(profile.sleeping_time) || ""}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
