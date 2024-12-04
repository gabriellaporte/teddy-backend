import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../../domain/entities';

export class ClientsListedDTO {
  @ApiProperty({
    example: [
      {
        id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        name: 'William C. Brown',
        monthlyIncome: 500000,
        businessValuation: 1000000,
      },
    ],
    description:
      'Os clientes. Os valores de salário e valor de empresa estão em centavos.',
  })
  data: Client[];

  @ApiProperty({
    example: [
      {
        totalPages: 5,
      },
    ],
    description:
      'Metadados contendo o total de páginas de clientes disponíveis.',
  })
  meta: object;
}
