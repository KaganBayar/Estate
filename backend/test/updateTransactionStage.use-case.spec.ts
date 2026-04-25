import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionStageUseCase } from '@/application/use-cases/Transaction/updateTransactionStage.use-case';
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { AgentRepository } from '@/infrastructure/repository/Agent/agent.repository';
import { AgencyRepository } from '@/infrastructure/repository/Agency/agency.repository';
import { NotFoundException } from '@nestjs/common';

describe('UpdateTransactionStageUseCase', () => {
  let useCase: UpdateTransactionStageUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let agentRepository: jest.Mocked<AgentRepository>;
  let agencyRepository: jest.Mocked<AgencyRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionStageUseCase,
        {
          provide: TransactionRepository,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: AgentRepository,
          useValue: {
            update: jest.fn(),
          },
        },
        {
          provide: AgencyRepository,
          useValue: {
            findAll: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateTransactionStageUseCase>(
      UpdateTransactionStageUseCase,
    );
    transactionRepository = module.get(TransactionRepository);
    agentRepository = module.get(AgentRepository);
    agencyRepository = module.get(AgencyRepository);
  });

  it('should throw NotFoundException if transaction does not exist', async () => {
    transactionRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent', 'completed')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update stage and NOT distribute fee if stage is not "completed"', async () => {
    const mockTransaction = {
      _id: 't1',
      stage: 'agreement',
      totalServiceFee: 1000,
    };
    transactionRepository.findById.mockResolvedValue(mockTransaction as any);
    transactionRepository.update.mockResolvedValue({
      ...mockTransaction,
      stage: 'earnest_money',
    } as any);

    await useCase.execute('t1', 'earnest_money');

    expect(transactionRepository.update).toHaveBeenCalledWith('t1', {
      stage: 'earnest_money',
    });
    expect(agencyRepository.update).not.toHaveBeenCalled();
    expect(agentRepository.update).not.toHaveBeenCalled();
  });

  it('should distribute fee when moving to "completed" stage with different agents', async () => {
    const mockTransaction = {
      _id: 't1',
      stage: 'earnest_money',
      totalServiceFee: 1000,
      listingAgent: { _id: 'agent1', toString: () => 'agent1' },
      sellingAgent: { _id: 'agent2', toString: () => 'agent2' },
    };
    const updatedTransaction = { ...mockTransaction, stage: 'completed' };

    transactionRepository.findById.mockResolvedValue(mockTransaction as any);
    transactionRepository.update.mockResolvedValue(updatedTransaction as any);
    agencyRepository.findAll.mockResolvedValue([{ _id: 'agency1' }] as any);

    await useCase.execute('t1', 'completed');

    // Agency check
    expect(agencyRepository.update).toHaveBeenCalledWith('agency1', {
      totalMoney: 500,
    });

    // Agents check
    expect(agentRepository.update).toHaveBeenCalledWith('agent1', {
      totalMoney: 250,
      listingDealCount: 1,
    });
    expect(agentRepository.update).toHaveBeenCalledWith('agent2', {
      totalMoney: 250,
      sellingDealCount: 1,
    });
  });

  it('should distribute fee when moving to "completed" stage with same agent', async () => {
    const mockTransaction = {
      _id: 't1',
      stage: 'earnest_money',
      totalServiceFee: 1000,
      listingAgent: { _id: 'agent1', toString: () => 'agent1' },
      sellingAgent: { _id: 'agent1', toString: () => 'agent1' },
    };
    const updatedTransaction = { ...mockTransaction, stage: 'completed' };

    transactionRepository.findById.mockResolvedValue(mockTransaction as any);
    transactionRepository.update.mockResolvedValue(updatedTransaction as any);
    agencyRepository.findAll.mockResolvedValue([{ _id: 'agency1' }] as any);

    await useCase.execute('t1', 'completed');

    // Agents check for same agent
    expect(agentRepository.update).toHaveBeenCalledWith('agent1', {
      totalMoney: 500,
      listingDealCount: 1,
      sellingDealCount: 1,
    });
  });

  it('should NOT distribute fee if stage is already "completed"', async () => {
    const mockTransaction = {
      _id: 't1',
      stage: 'completed',
      totalServiceFee: 1000,
    };
    transactionRepository.findById.mockResolvedValue(mockTransaction as any);
    transactionRepository.update.mockResolvedValue(mockTransaction as any);

    await useCase.execute('t1', 'completed');

    expect(agencyRepository.update).not.toHaveBeenCalled();
    expect(agentRepository.update).not.toHaveBeenCalled();
  });
});
