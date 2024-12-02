import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../user/domain/interfaces';
import { IAuthService } from '../../domain/interfaces';
import { UserEntity } from '../../../user/domain/entities';
import { AuthenticateDto } from '../../presentation/dtos';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: AuthenticateDto): Promise<UserEntity> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais incorretas!');
  }

  async login(user: UserEntity): Promise<IAuthService.AccessToken> {
    const payload = { email: user.email, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
