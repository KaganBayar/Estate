import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {BaseEntity} from "@/domain/entities/.Base/baseEntity.schema"

export type PropertyDocument = HydratedDocument<Property>;

@Schema({timestamps: true})
export class Property extends BaseEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;
    
    @Prop({ required: true })
    earnestMoney: number;

}

export const PropertySchema = SchemaFactory.createForClass(Property);
