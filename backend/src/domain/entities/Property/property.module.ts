import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from "./property.schema";
import { PropertyRepository } from "@/infrastructure/repository/Property/property.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])
    ],
    controllers: [],
    providers: [PropertyRepository],
    exports: [MongooseModule]
})
export class PropertyModule {}