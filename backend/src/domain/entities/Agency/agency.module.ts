import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, AgencySchema } from "./agency.schema";
import { AgencyRepository } from "@/infrastructure/repository/Agency/agency.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }])
    ],
    controllers: [],
    providers: [AgencyRepository],
    exports: [MongooseModule]
})
export class AgencyModule {}