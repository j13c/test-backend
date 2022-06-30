import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../config';
import { User, UsersService } from './../user';
import { ForgotPassword, ResetPassword } from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) { }

  async createToken(user: User) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  async validateUser(payload: LoginDto): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }

  async forgotPassword(payload: ForgotPassword): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('Please verify email inserted');
    }
    const token = this.jwtService.sign({ id: user.id });
    const RESET_PASSWORD = '/reset-password/';
    const link = `${this.configService.get('APP_URL')}${RESET_PASSWORD}${token}`;
    //TODO: Send email with link
    /* try catch */
    console.log(link);
    return ` we send you link for reset password to email ${payload.email}`;
  }

  async resetPassword(payload: ResetPassword, user: User): Promise<any> {
    const password = payload.password;
    const userModify = {...user, password};
    console.log(userModify);
    return this.userService.update(userModify);
  }
}