import { Injectable } from '@nestjs/common';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';

@Injectable()
export class UserService {
  async register(request: RegisterUserRequest): Promise<UserResponse> {
    return null;
  }
}
