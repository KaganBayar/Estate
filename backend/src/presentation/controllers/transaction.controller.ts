import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { CreateTransactionDto } from '@/presentation/dtos/Transaction/create-transaction-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { UpdateTransactionStageUseCase } from '@/application/use-cases/Transaction/updateTransactionStage.use-case';
import { GetFinancialBreakdownUseCase } from '@/application/use-cases/Transaction/getFinancialBreakdown.use-case';
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly updateStageUseCase: UpdateTransactionStageUseCase,
    private readonly getBreakdownUseCase: GetFinancialBreakdownUseCase,
  ) {}

  @Get()
  async findAll() {
    return this.transactionRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.transactionRepository.findById(id);
  }

  @Get(':id/breakdown')
  async getBreakdown(@Param('id') id: string) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.getBreakdownUseCase.execute(transaction);
  }

  @Post()
  async create(@Body() createDto: CreateTransactionDto) {
    return this.transactionRepository.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDtoFor<Transaction>,
  ) {
    if (updateDto.stage) {
      return this.updateStageUseCase.execute(id, updateDto.stage);
    }
    return this.transactionRepository.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.transactionRepository.delete(id);
  }
}
