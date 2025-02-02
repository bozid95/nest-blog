import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from 'src/model/web.model';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);
    return { data: result };
  }

  @Get()
  async getAll(): Promise<WebResponse<UserResponse[]>> {
    const result = await this.userService.getAll();
    return { data: result };
  }
}
