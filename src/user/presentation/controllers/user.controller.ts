import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos';
import { CreateUserUseCase } from '../../application/use-cases';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<{ message: string }> {
    console.log('a');
    await this.createUserUseCase.execute(data);
    return { message: 'User created successfully' };
  }
}
