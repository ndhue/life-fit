export interface UserRegister {
  email: string,
  fullname: string,
  birthday: string,
  password: string,
  confirmpassword: string
}

export interface UserLogin {
  email: string,
  password: string,
}

export interface NewPassword {
  password: string;
  confirmpassword: string;
}