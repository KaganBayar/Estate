import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, AgencySchema } from './agency.schema';
import { AgencyRepository } from '@/infrastructure/repository/Agency/agency.repository';
import { AgencyController } from '@/presentation/controllers/agency.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }]),
  ],
  controllers: [AgencyController],
  providers: [AgencyRepository],
  exports: [MongooseModule, AgencyRepository],
})
export class AgencyModule {}
