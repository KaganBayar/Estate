import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PropertyRepository } from '@/infrastructure/repository/Property/property.repository';
import { CreatePropertyDto } from '@/presentation/dtos/Property/create-property-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Property } from '@/domain/entities/Property/property.schema';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  @Get()
  async findAll() {
    return this.propertyRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.propertyRepository.findById(id);
  }

  @Post()
  async create(@Body() createDto: CreatePropertyDto) {
    return this.propertyRepository.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDtoFor<Property>,
  ) {
    return this.propertyRepository.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.propertyRepository.delete(id);
  }
}
