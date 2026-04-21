import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AgencyRepository } from '@/infrastructure/repository/Agency/agency.repository';
import { CreateAgencyDto } from '@/presentation/dtos/Agency/create-agency-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Agency } from '@/domain/entities/Agency/agency.schema';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyRepository: AgencyRepository) {}

  @Get()
  async findAll() {
    return this.agencyRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.agencyRepository.findById(id);
  }

  @Post()
  async create(@Body() createDto: CreateAgencyDto) {
    return this.agencyRepository.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDtoFor<Agency>) {
    return this.agencyRepository.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.agencyRepository.delete(id);
  }
}
