import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from "./property.schema";
import { PropertyService } from "@/infrastructure/services/Property/property.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])
    ],
    controllers: [],
    providers: [PropertyService],
    exports: [MongooseModule]
})
export class PropertyModule {}