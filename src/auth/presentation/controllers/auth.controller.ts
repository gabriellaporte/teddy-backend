import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from '../dtos';
import { AuthenticateUseCase } from '../../application/use-cases';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post('login')
  async login(@Body() data: AuthenticateDto) {
    return await this.authenticateUseCase.execute(data);
  }
}
