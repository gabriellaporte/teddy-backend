import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateDto {
  @ApiProperty({ example: 'john@doe.com', description: 'Email de login' })
  @IsEmail({}, { message: 'Você deve especificar um email válido' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'Você deve especificar uma senha' })
  password: string;
}
