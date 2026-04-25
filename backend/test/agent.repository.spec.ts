import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AgentRepository } from '@/infrastructure/repository/Agent/agent.repository';
import { Agent } from '@/domain/entities/Agent/agent.schema';
import { Model } from 'mongoose';

describe('AgentRepository', () => {
  let repository: AgentRepository;
  let model: any;

  const mockQuery = {
    exec: jest.fn(),
  };

  const mockAgentModel = function (data) {
    this.data = data;
    this.save = jest.fn().mockResolvedValue(data);
  };
  (mockAgentModel as any).find = jest.fn().mockReturnValue(mockQuery);
  (mockAgentModel as any).findById = jest.fn().mockReturnValue(mockQuery);
  (mockAgentModel as any).findByIdAndUpdate = jest
    .fn()
    .mockReturnValue(mockQuery);
  (mockAgentModel as any).findByIdAndDelete = jest
    .fn()
    .mockReturnValue(mockQuery);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentRepository,
        {
          provide: getModelToken(Agent.name),
          useValue: mockAgentModel,
        },
      ],
    }).compile();

    repository = module.get<AgentRepository>(AgentRepository);
    model = module.get<Model<Agent>>(getModelToken(Agent.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call find with correct filter in findAll', async () => {
    const filter = { name: 'John' };
    mockQuery.exec.mockResolvedValue([]);

    await repository.findAll(filter);

    expect(model.find).toHaveBeenCalledWith(filter);
    expect(mockQuery.exec).toHaveBeenCalled();
  });

  it('should call findById with correct id', async () => {
    const id = 'agent-id';
    mockQuery.exec.mockResolvedValue(null);

    await repository.findById(id);

    expect(model.findById).toHaveBeenCalledWith(id);
  });

  it('should call findByIdAndUpdate with correct params in update', async () => {
    const id = 'agent-id';
    const data = { name: 'Updated Name' };
    mockQuery.exec.mockResolvedValue(null);

    await repository.update(id, data);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, data, {
      returnDocument: 'after',
      runValidators: true,
    });
  });

  it('should call findByIdAndDelete with correct id', async () => {
    const id = 'agent-id';
    mockQuery.exec.mockResolvedValue(null);

    await repository.delete(id);

    expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
