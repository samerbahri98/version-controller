import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../auth.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(()=>UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!(user && (await bcrypt.compare(pass, user.password || ''))))
      return null;
    return user;
  }

  async createUser(credentials): Promise<User> {
    const salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(credentials.password, salt);
    password = password.replace('a', 'y');
    const createUserInput = credentials;
    createUserInput['password'] = password;
    createUserInput['unencryptedPassword'] = credentials.password
    return await this.userService.create(createUserInput);
  }

  async login(user: User): Promise<Auth> {
    return {
      accessToken: this.jwtService.sign(
        { userId: user.user_id },
        {
          secret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
          expiresIn: 3600,
        },
      ),
      refreshToken: this.jwtService.sign(
        { userId: user.user_id },
        {
          secret: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
          expiresIn: 3600,
        },
      ),
      user,
    };
  }
}
