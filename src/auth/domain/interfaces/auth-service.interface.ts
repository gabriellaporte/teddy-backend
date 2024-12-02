import { AuthenticateDto } from '../../presentation/dtos';

export interface IAuthService {
  validateUser(data: AuthenticateDto): Promise<any>;

  login(user: any): Promise<{ accessToken: string }>;
}

export const AUTH_SERVICE = Symbol('IAuthService');
