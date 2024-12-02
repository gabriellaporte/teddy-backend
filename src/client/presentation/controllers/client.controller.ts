import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateClientUseCase } from '../../application/use-cases/create-client.use-case';
import { GetClientsUseCase } from '../../application/use-cases/get-clients.use-case';
import { UpdateClientUseCase } from '../../application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '../../application/use-cases/delete-client.use-case';
import { CreateClientDTO, PaginateClientsDTO, UpdateClientDTO } from '../dtos';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: PaginateClientsDTO) {
    const { limit = 10, offset = 0 } = query;
    return await this.getClientsUseCase.execute({ limit, offset });
  }

  @Post()
  async create(@Body() data: CreateClientDTO) {
    return await this.createClientUseCase.execute(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateClientDTO) {
    return await this.updateClientUseCase.execute(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteClientUseCase.execute(id);
  }
}
