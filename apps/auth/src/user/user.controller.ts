import { Controller } from '@nestjs/common'
import { Observable } from 'rxjs'

import {
  AuthServiceController,
  AuthServiceControllerMethods,
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  MeDto,
  UpdatePassDto,
  UpdatePassRes,
  User,
  VerifyDto,
  VerifyResponse,
} from '@shared/index'

import { UserService } from './user.service'

@Controller()
@AuthServiceControllerMethods()
export class UserController implements AuthServiceController {
  constructor(private readonly userService: UserService) {}

  registration(dto: CreateUserDto): Promise<User> {
    return this.userService.register(dto)
  }

  loginUser(dto: LoginUserDto): Promise<User> {
    return this.userService.login(dto)
  }

  me(dto: MeDto): User | Promise<User> | Observable<User> {
    return this.userService.me(dto.userId)
  }
  verify(dto: VerifyDto): VerifyResponse | Promise<VerifyResponse> | Observable<VerifyResponse> {
    return this.userService.verifyAccount(dto)
  }
  forgotPass(dto: ForgotPasswordDto): User | Promise<User> | Observable<User> {
    return this.userService.forgotPass(dto)
  }
  updatePass(
    dto: UpdatePassDto,
  ): UpdatePassRes | Promise<UpdatePassRes> | Observable<UpdatePassRes> {
    return this.userService.passwordUpdate(dto)
  }
}
