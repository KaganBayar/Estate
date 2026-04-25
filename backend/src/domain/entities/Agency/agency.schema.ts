import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyDocument = HydratedDocument<Agency>;

@Schema({ timestamps: true })
export class Agency {
  @Prop({ default: 'singleton' })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, default: 0 })
  totalMoney: number;
}
export const AgencySchema = SchemaFactory.createForClass(Agency);
