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
import { Types } from 'mongoose';
import { HttpException } from '@nestjs/common';
@Controller('agents')
export class AgentController {
  constructor(private readonly agentRepository: AgentRepository) {}

  @Get()
  async findAll() {
    return this.agentRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    //check if id parameter a mongodb id
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Agent not found', 404);
    const findAgent = await this.agentRepository.findById(id);
    if (!findAgent) throw new HttpException('Agent not found', 404);
    return findAgent;
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
    //check if id parameter a mongodb id
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedAgent = await this.agentRepository.update(id, updateDto);
    if (!updatedAgent) throw new HttpException('Agent Not Found', 404);
    return updatedAgent;
  }

  @Delete(':id')
   //check if id parameter a mongodb id
  async delete(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedAgent = await this.agentRepository.delete(id);
    if (!deletedAgent) throw new HttpException('Agent Not Found', 404);
    return deletedAgent;
  }
}
