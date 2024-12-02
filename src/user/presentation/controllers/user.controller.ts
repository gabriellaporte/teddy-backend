import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos';
import { CreateUserUseCase } from '../../application/use-cases';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserCreatedDTO } from '../dtos/response/user-created.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: UserCreatedDTO })
  async createUser(@Body() data: CreateUserDTO): Promise<UserCreatedDTO> {
    const user = await this.createUserUseCase.execute(data);
    return { message: 'Usuário criado com sucesso!', data: user };
  }
}
