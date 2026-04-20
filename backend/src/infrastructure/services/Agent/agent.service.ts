import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent } from '@/domain/entities/Agent/agent.schema';
import { BaseService } from '../base.service';

@Injectable()
export class AgentService extends BaseService<Agent> {
    constructor(@InjectModel(Agent.name) private agentModel : Model<Agent>) {
        super(agentModel)
    }
}
