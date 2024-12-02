import { AuthenticateDto } from '../../presentation/dtos';

export interface IAuthService {
  validateUser(data: AuthenticateDto): Promise<any>;

  login(user: any): Promise<IAuthService.AccessToken>;
}

export const AUTH_SERVICE = Symbol('IAuthService');

export namespace IAuthService {
  export type AccessToken = {
    accessToken: string;
  };
}
