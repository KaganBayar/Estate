import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AgencyRepository } from '@/infrastructure/repository/Agency/agency.repository';
import { Agency } from '@/domain/entities/Agency/agency.schema';
import { Model } from 'mongoose';

describe('AgencyRepository', () => {
  let repository: AgencyRepository;
  let model: any;

  const mockQuery = {
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgencyRepository,
        {
          provide: getModelToken(Agency.name),
          useValue: {
            find: jest.fn().mockReturnValue(mockQuery),
            findById: jest.fn().mockReturnValue(mockQuery),
            findByIdAndUpdate: jest.fn().mockReturnValue(mockQuery),
          },
        },
      ],
    }).compile();

    repository = module.get<AgencyRepository>(AgencyRepository);
    model = module.get<Model<Agency>>(getModelToken(Agency.name));
  });

  it('should call find with correct filter in findAll', async () => {
    mockQuery.exec.mockResolvedValue([]);
    await repository.findAll({});
    expect(model.find).toHaveBeenCalledWith({});
  });

  it('should call findByIdAndUpdate with correct params in update', async () => {
    const id = 'agency-id';
    const data = { totalMoney: 1000 };
    mockQuery.exec.mockResolvedValue(null);

    await repository.update(id, data);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, data, {
      returnDocument: 'after',
      runValidators: true,
    });
  });
});
