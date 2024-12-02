import { AUTH_SERVICE, IAuthService } from '../../domain/interfaces';
import { Inject } from '@nestjs/common';
import { AuthenticateDto } from '../../presentation/dtos';

export class AuthenticateUseCase {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  async execute(data: AuthenticateDto) {
    return await this.authService.login(
      await this.authService.validateUser(data),
    );
  }
}
