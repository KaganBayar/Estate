import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgentDocument = HydratedDocument<Agent>;

@Schema({timestamps: true})
export class Agent {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true , default: 0})
    totalMoney: number;

    @Prop({ required: true , default: 0})
    listingDealCount: number;

    @Prop({ required: true , default: 0})
    sellingDealCount: number;

}

export const AgentSchema = SchemaFactory.createForClass(Agent);
