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
import { PropertyRepository } from '@/infrastructure/repository/Property/property.repository';
import { CreatePropertyDto } from '@/presentation/dtos/Property/create-property-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Property } from '@/domain/entities/Property/property.schema';
import { Types } from 'mongoose';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  @Get()
  async findAll() {
    return this.propertyRepository.findAll();
  }

  @Get(':id')
   //check if id parameter a mongodb id
  async findById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Property not found', 404);
    const findProperty = await this.propertyRepository.findById(id);
    if (!findProperty) throw new HttpException('Property not found', 404);
    return findProperty;
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
     //check if id parameter a mongodb id
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedProperty = await this.propertyRepository.update(id, updateDto);
    if (!updatedProperty) throw new HttpException('Property Not Found', 404);
    return updatedProperty;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
     //check if id parameter a mongodb id
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedProperty = await this.propertyRepository.delete(id);
    if (!deletedProperty) throw new HttpException('Property Not Found', 404);
    return deletedProperty;
  }
}
