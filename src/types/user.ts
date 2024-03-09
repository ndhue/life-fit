export interface UserRegister {
  email: string,
  fullname: string,
  birthday: string,
  password: string,
  confirmpassword: string
}

export interface UserProfile {
  gender: string,
  age: number,
  weight: number,
  height: number,
  wakeup_time: string,
  sleeping_time: string,
}

export interface UserLogin {
  email: string,
  password: string,
}

export interface NewPassword {
  password: string;
  confirmpassword: string;
}