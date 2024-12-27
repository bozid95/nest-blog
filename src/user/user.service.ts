import { HttpException, Injectable, Inject } from '@nestjs/common';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { PrismaService } from 'src/common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ValidationService } from 'src/common/validation.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}
  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info(`register user ${JSON.stringify(request)}`);
    const registerRequest: RegisterUserRequest =
      this.validationService.validate(UserValidation.REGISTER_USER, request);

    const ifExist = await this.prismaService.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });
    if (ifExist) {
      throw new HttpException('User already exist', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    const user = await this.prismaService.user.create({
      data: registerRequest,
    });
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  async getAll(): Promise<UserResponse[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }
}
