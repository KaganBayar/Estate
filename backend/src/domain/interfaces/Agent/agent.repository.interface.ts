import { Agent } from '@/domain/entities/Agent/agent.schema';
import { IBaseRepository } from '../.Base/base.repository.interface';

export interface IAgentRepository extends IBaseRepository<Agent> {}
