import Toast from "react-native-toast-message";

export const showToastSuccessSignIn = () => {
  Toast.show({
    type: "success",
    text1: "Đăng nhập thành công",
    position: 'bottom'
  });
};

export const showToastErrorSignIn = () => {
  Toast.show({
    type: "error",
    text1: "Đăng nhập thất bại",
    text2: "Hãy kiểm tra lại email hoặc mật khẩu",
    position: 'bottom'
  });
};

export const showToastSuccessSendOtp = () => {
  Toast.show({
    type: "success",
    text1: "Gửi OTP thành công",
    position: 'bottom'
  });
};

export const showToastErrorSendOtp = () => {
  Toast.show({
    type: "error",
    text1: "Gửi OTP thất bại",
    position: 'bottom'
  });
};

export const showToastSuccessAuth = () => {
  Toast.show({
    type: "success",
    text1: "Xác thực thành công",
    position: 'bottom'
  });
};

export const showToastErrorAuth = () => {
  Toast.show({
    type: "error",
    text1: "Xác thực thất bại",
    position: 'bottom'
  });
};

export const showToastSuccessNewPassWord = () => {
  Toast.show({
    type: "success",
    text1: "Thay đổi mật khẩu thành công",
    text2: "Hãy đăng nhập lại",
    position: 'bottom'
  });
};

export const showToastErrorNewPassWord = () => {
  Toast.show({
    type: "error",
    text1: "Thay đổi mật khẩu thất bại",
    position: 'bottom'
  });
};

export const showToastSuccessEditProfile = () => {
  Toast.show({
    type: "success",
    text1: "Cập nhật hồ sơ thành công",
    position: 'bottom'
  });
};

export const showToastErrorEditProfile = () => {
  Toast.show({
    type: "error",
    text1: "Cập nhật hồ sơ thất bại",
    position: 'bottom'
  });
};

// Water
export const showToastSuccessSetGoal = () => {
  Toast.show({
    type: "success",
    text1: "Đặt mục tiêu thành công",
    position: 'bottom'
  });
};

export const showToastErrorSetGoal = () => {
  Toast.show({
    type: "error",
    text1: "Đặt mục tiêu thất bại",
    position: 'bottom'
  });
};

// Update
export const showToastSuccessUpdate = () => {
  Toast.show({
    type: "success",
    text1: "Cập nhật thành công",
    position: 'bottom'
  });
};

export const showToastErrorUpdate = () => {
  Toast.show({
    type: "error",
    text1: "Cập nhật thất bại",
    position: 'bottom'
  });
};

// Delete
export const showToastSuccessDelete = () => {
  Toast.show({
    type: "success",
    text1: "Xóa thành công",
    position: 'bottom'
  });
};

export const showToastErrorDelete = () => {
  Toast.show({
    type: "error",
    text1: "Xóa thất bại",
    position: 'bottom'
  });
};

// Delete
export const showToastSuccessAdd = () => {
  Toast.show({
    type: "success",
    text1: "Thêm dữ liệu thành công",
    position: 'bottom'
  });
};

export const showToastErrorAdd = () => {
  Toast.show({
    type: "error",
    text1: "Thêm dữ liệu thất bại",
    position: 'bottom'
  });
};