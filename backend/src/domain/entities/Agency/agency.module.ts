import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, AgencySchema } from "./agency.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }])
    ],
    controllers: [],
    providers: [],
    exports: [MongooseModule]
})
export class AgencyModule {}