import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { TransactionController } from '@/presentation/controllers/transaction.controller';
import { AgentsModule } from '../Agent/agent.module';
import { AgencyModule } from '../Agency/agency.module';
import { UpdateTransactionStageUseCase } from '@/application/use-cases/Transaction/updateTransactionStage.use-case';
import { GetFinancialBreakdownUseCase } from '@/application/use-cases/Transaction/getFinancialBreakdown.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    AgentsModule,
    AgencyModule,
  ],
  controllers: [TransactionController],
  providers: [
    TransactionRepository,
    UpdateTransactionStageUseCase,
    GetFinancialBreakdownUseCase,
  ],
  exports: [MongooseModule],
})
export class TransactionModule {}
