import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDTO {
  @ApiProperty({ example: 'John Doe', description: 'Nome do cliente' })
  @IsString({ message: 'Você deve especificar o nome do cliente' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 500000,
    description: 'Salário mensal do cliente em centavos (*100)',
  })
  @IsInt({ message: 'Você deve especificar um salário mensal válido' })
  @IsOptional()
  monthlyIncome?: number;

  @ApiProperty({
    example: 1000000,
    description: 'Valor de empresa do cliente em centavos (*100)',
  })
  @IsInt({
    message: 'Você deve especificar o valor de empresa válido do cliente',
  })
  @IsOptional()
  businessValuation?: number;
}
