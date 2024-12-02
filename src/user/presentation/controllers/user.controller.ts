import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos';
import { CreateUserUseCase } from '../../application/use-cases';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso!' })
  async createUser(@Body() data: CreateUserDTO): Promise<{ message: string }> {
    await this.createUserUseCase.execute(data);
    return { message: 'Usuário criado com sucesso!' };
  }
}
