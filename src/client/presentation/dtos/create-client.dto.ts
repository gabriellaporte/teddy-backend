import { IsInt, IsString } from 'class-validator';

export class CreateClientDTO {
  @IsString({ message: 'Você deve especificar o nome do cliente' })
  name: string;

  @IsInt({ message: 'Você deve especificar um salário mensal válido' })
  monthlyIncome: number;

  @IsInt({
    message: 'Você deve especificar o valor de empresa válido do cliente',
  })
  businessValuation: number;
}
