import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/controllers/app.controller';
import { AppService } from '../../infrastructure/services/app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsModule } from '@/domain/entities/Agent/agent.module';
import { PropertyModule } from '@/domain/entities/Property/property.module';
import { AgencyModule } from '@/domain/entities/Agency/agency.module';
import { TransactionModule } from '@/domain/entities/Transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION!),
    AgentsModule,
    PropertyModule,
    AgencyModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
