import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { Model } from 'mongoose';

describe('TransactionRepository', () => {
  let repository: TransactionRepository;
  let model: any;

  const mockQuery = {
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        {
          provide: getModelToken(Transaction.name),
          useValue: {
            find: jest.fn().mockReturnValue(mockQuery),
            findById: jest.fn().mockReturnValue(mockQuery),
            findByIdAndUpdate: jest.fn().mockReturnValue(mockQuery),
            constructor: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<TransactionRepository>(TransactionRepository);
    model = module.get<Model<Transaction>>(getModelToken(Transaction.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call find with correct populate chain in findAll', async () => {
    const filter = { stage: 'completed' };
    mockQuery.exec.mockResolvedValue([]);

    await repository.findAll(filter);

    expect(model.find).toHaveBeenCalledWith(filter);
    expect(mockQuery.populate).toHaveBeenCalledWith('listingAgent');
    expect(mockQuery.populate).toHaveBeenCalledWith('sellingAgent');
    expect(mockQuery.populate).toHaveBeenCalledWith('property');
    expect(mockQuery.exec).toHaveBeenCalled();
  });

  it('should call findById with correct populate chain', async () => {
    const id = 'some-id';
    mockQuery.exec.mockResolvedValue(null);

    await repository.findById(id);

    expect(model.findById).toHaveBeenCalledWith(id);
    expect(mockQuery.populate).toHaveBeenCalledWith('listingAgent');
    expect(mockQuery.populate).toHaveBeenCalledWith('sellingAgent');
    expect(mockQuery.populate).toHaveBeenCalledWith('property');
  });

  it('should call findByIdAndUpdate with correct populate chain and { returnDocument: \'after\' }', async () => {
    const id = 'some-id';
    const data = { stage: 'completed' };
    mockQuery.exec.mockResolvedValue(null);

    await repository.update(id, data);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, data, {
      returnDocument: 'after',
    });
    expect(mockQuery.populate).toHaveBeenCalledWith('listingAgent');
    expect(mockQuery.populate).toHaveBeenCalledWith('sellingAgent');
    expect(mockQuery.populate).toHaveBeenCalledWith('property');
  });
});
