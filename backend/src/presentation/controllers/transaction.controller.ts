import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { CreateTransactionDto } from '@/presentation/dtos/Transaction/create-transaction-dto';
import type { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  @Get()
  async findAll() {
    return this.transactionRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.transactionRepository.findById(id);
  }

  @Post()
  async create(@Body() createDto: CreateTransactionDto) {
    return this.transactionRepository.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDtoFor<Transaction>) {
    return this.transactionRepository.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.transactionRepository.delete(id);
  }
}
