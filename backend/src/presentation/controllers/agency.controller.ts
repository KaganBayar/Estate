import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
} from '@nestjs/common';
import { AgencyRepository } from '@/infrastructure/repository/Agency/agency.repository';
import { CreateAgencyDto } from '@/presentation/dtos/Agency/create-agency-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Agency } from '@/domain/entities/Agency/agency.schema';
import { Types } from 'mongoose';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyRepository: AgencyRepository) {}

  @Get()
  async findAll() {
    return this.agencyRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Agency not found', 404);
    const findAgency = await this.agencyRepository.findById(id);
    if (!findAgency) throw new HttpException('Agency not found', 404);
    return findAgency;
  }

  @Post()
  async create(@Body() createDto: CreateAgencyDto) {
    return this.agencyRepository.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDtoFor<Agency>,
  ) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedAgency = await this.agencyRepository.update(id, updateDto);
    if (!updatedAgency) throw new HttpException('Agency Not Found', 404);
    return updatedAgency;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedAgency = await this.agencyRepository.delete(id);
    if (!deletedAgency) throw new HttpException('Agency Not Found', 404);
    return deletedAgency;
  }
}
