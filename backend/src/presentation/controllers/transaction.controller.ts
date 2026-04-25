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
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { CreateTransactionDto } from '@/presentation/dtos/Transaction/create-transaction-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { UpdateTransactionStageUseCase } from '@/application/use-cases/Transaction/updateTransactionStage.use-case';
import { GetFinancialBreakdownUseCase } from '@/application/use-cases/Transaction/getFinancialBreakdown.use-case';
import { Types } from 'mongoose';

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
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Transaction not found', 404);
    const findTransaction = await this.transactionRepository.findById(id);
    if (!findTransaction) throw new HttpException('Transaction not found', 404);
    return findTransaction;
  }

  @Get(':id/breakdown')
  async getBreakdown(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Transaction not found', 404);
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new HttpException('Transaction not found', 404);
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
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);

    if (updateDto.stage) {
      const updatedTransaction = await this.updateStageUseCase.execute(id, updateDto.stage);
      if (!updatedTransaction) throw new HttpException('Transaction Not Found', 404);
      return updatedTransaction;
    }
    const updatedTransaction = await this.transactionRepository.update(id, updateDto);
    if (!updatedTransaction) throw new HttpException('Transaction Not Found', 404);
    return updatedTransaction;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedTransaction = await this.transactionRepository.delete(id);
    if (!deletedTransaction) throw new HttpException('Transaction Not Found', 404);
    return deletedTransaction;
  }
}
