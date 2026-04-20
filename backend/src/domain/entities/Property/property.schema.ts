import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({timestamps: true})
export class Property {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;
    
    @Prop({ required: true })
    earnestMoney: number;

}

export const PropertySchema = SchemaFactory.createForClass(Property);
