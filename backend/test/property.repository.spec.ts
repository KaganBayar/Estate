import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PropertyRepository } from '../src/infrastructure/repository/Property/property.repository';
import { Property } from '@/domain/entities/Property/property.schema';
import { Model } from 'mongoose';

describe('PropertyRepository', () => {
  let repository: PropertyRepository;
  let model: any;

  const mockQuery = {
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyRepository,
        {
          provide: getModelToken(Property.name),
          useValue: {
            find: jest.fn().mockReturnValue(mockQuery),
            findById: jest.fn().mockReturnValue(mockQuery),
            findByIdAndUpdate: jest.fn().mockReturnValue(mockQuery),
            findByIdAndDelete: jest.fn().mockReturnValue(mockQuery),
          },
        },
      ],
    }).compile();

    repository = module.get<PropertyRepository>(PropertyRepository);
    model = module.get<Model<Property>>(getModelToken(Property.name));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should call find with correct filter in findAll', async () => {
    mockQuery.exec.mockResolvedValue([]);
    await repository.findAll({ status: 'available' });
    expect(model.find).toHaveBeenCalledWith({ status: 'available' });
  });
});
