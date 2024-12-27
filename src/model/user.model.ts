export class RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  token?: string;
}
