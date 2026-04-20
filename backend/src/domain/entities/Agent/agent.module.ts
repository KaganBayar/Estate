import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from "./agent.schema";
import { AgentService } from "@/infrastructure/services/Agent/agent.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }])
    ],
    controllers: [],
    providers: [AgentService],
    exports: [MongooseModule]
})
export class AgentsModule {}