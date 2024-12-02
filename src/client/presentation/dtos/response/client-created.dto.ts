import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../../domain/entities';

export class ClientCreatedDTO {
  @ApiProperty({
    example: {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      name: 'William C. Brown',
      monthlyIncome: 500000,
      businessValuation: 1000000,
    },
    description:
      'O cliente criado. Os valores de salário e valor de empresa estão em centavos.',
  })
  data: Client;
}
