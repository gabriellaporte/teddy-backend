import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from '../dtos';
import { AuthenticateUseCase } from '../../application/use-cases';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthenticationSucessfulDTO } from '../dtos/response/authentication-sucessful.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post('login')
  @ApiOkResponse({ type: AuthenticationSucessfulDTO })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(
    @Body() data: AuthenticateDto,
  ): Promise<AuthenticationSucessfulDTO> {
    return await this.authenticateUseCase.execute(data);
  }
}
