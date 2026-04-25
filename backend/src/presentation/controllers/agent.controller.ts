import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AgentRepository } from '@/infrastructure/repository/Agent/agent.repository';
import { CreateAgentDto } from '@/presentation/dtos/Agent/create-agent-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Agent } from '@/domain/entities/Agent/agent.schema';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentRepository: AgentRepository) {}

  @Get()
  async findAll() {
    return this.agentRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.agentRepository.findById(id);
  }

  @Post()
  async create(@Body() createDto: CreateAgentDto) {
    return this.agentRepository.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDtoFor<Agent>,
  ) {
    return this.agentRepository.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.agentRepository.delete(id);
  }
}
