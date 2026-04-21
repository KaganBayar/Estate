import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from "./agent.schema";
import { AgentRepository } from "@/infrastructure/repository/Agent/agent.repository";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }])
    ],
    controllers: [],
    providers: [AgentRepository],
    exports: [MongooseModule]
})
export class AgentsModule {}