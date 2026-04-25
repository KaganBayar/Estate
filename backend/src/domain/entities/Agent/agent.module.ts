import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from './agent.schema';
import { AgentRepository } from '@/infrastructure/repository/Agent/agent.repository';
import { AgentController } from '@/presentation/controllers/agent.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  controllers: [AgentController],
  providers: [AgentRepository],
  exports: [MongooseModule, AgentRepository],
})
export class AgentsModule {}
