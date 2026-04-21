import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent } from '@/domain/entities/Agent/agent.schema';
import { MongoBaseRepository } from '../.Base/mongo-base.repository';
import { IAgentRepository } from '@/domain/repository/Agent/IAgentRepository';

@Injectable()
export class AgentRepository extends MongoBaseRepository<Agent> implements IAgentRepository {
    constructor(@InjectModel(Agent.name) private agentModel : Model<Agent>) {
        super(agentModel)
    }
}
