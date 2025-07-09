export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SignupBody {
  email: string;
  password: string;
  name: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
