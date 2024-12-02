import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Você deve especificar o nome de usuário' })
  name: string;

  @IsEmail({}, { message: 'Você deve especificar um e-mail válido.' })
  email: string;

  @MinLength(6, {
    message: 'Você deve especificar uma senha de pelo menos 6 caracteres',
  })
  password: string;
}
