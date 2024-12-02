import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticateDto } from '../dtos';
import { AuthenticateUseCase } from '../../application/use-cases';
import { JwtAuthGuard } from '../../infra/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post('login')
  async login(@Body() data: AuthenticateDto) {
    return await this.authenticateUseCase.execute(data);
  }

  @Get('/teste')
  @UseGuards(JwtAuthGuard)
  async test() {
    console.log('a');
  }
}
