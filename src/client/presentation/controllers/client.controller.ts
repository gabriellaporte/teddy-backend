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
import {
  ClientsListedDTO,
  CreateClientDTO,
  PaginateClientsDTO,
  UpdateClientDTO,
} from '../dtos';
import { ClientIdDTO } from '../dtos/request/client-id.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ClientCreatedDTO } from '../dtos/response/client-created.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Clientes listados com sucesso',
    type: ClientsListedDTO,
  })
  async findAll(@Query() query: PaginateClientsDTO) {
    const { limit = 10, offset = 0 } = query;
    return await this.getClientsUseCase.execute({ limit, offset });
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Cliente criado com sucesso',
    type: ClientCreatedDTO,
  })
  async create(@Body() data: CreateClientDTO) {
    return await this.createClientUseCase.execute(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Cliente atualizado com sucesso',
    type: ClientCreatedDTO,
  })
  async update(@Param() params: ClientIdDTO, @Body() data: UpdateClientDTO) {
    return await this.updateClientUseCase.execute(params.id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Cliente deletado com sucesso',
    example: { message: 'Cliente deletado com sucesso!' },
  })
  async delete(@Param() params: ClientIdDTO) {
    await this.deleteClientUseCase.execute(params.id);
    return { message: 'Cliente deletado com sucesso!' };
  }
}
