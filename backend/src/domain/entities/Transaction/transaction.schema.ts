import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Property } from '../Property/property.schema';
import { Agent } from '../Agent/agent.schema';
import { BaseEntity } from '@/domain/entities/.Base/baseEntity.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  })
  property: Property;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Agent' })
  sellingAgent: Agent;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Agent' })
  listingAgent: Agent;

  @Prop({ required: true, default: 0 })
  totalServiceFee: number;

  @Prop({
    type: String,
    enum: ['agreement', 'earnest_money', 'title_deed', 'completed'],
    default: 'agreement',
  })
  stage: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
