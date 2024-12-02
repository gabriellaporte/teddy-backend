import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateClientDTO {
  @IsString({ message: 'Você deve especificar o nome do cliente' })
  @IsOptional()
  name?: string;

  @IsInt({ message: 'Você deve especificar um salário mensal válido' })
  @IsOptional()
  monthlyIncome?: number;

  @IsInt({
    message: 'Você deve especificar o valor de empresa válido do cliente',
  })
  @IsOptional()
  businessValuation?: number;
}
