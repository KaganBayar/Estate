import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './property.schema';
import { PropertyRepository } from '@/infrastructure/repository/Property/property.repository';
import { PropertyController } from '@/presentation/controllers/property.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyRepository],
  exports: [MongooseModule],
})
export class PropertyModule {}
