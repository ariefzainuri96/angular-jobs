export interface RegisterResponse {
  message: string;
  status: number;
  data: RegisterData;
}

export interface RegisterData {
  email: string;
  password: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
