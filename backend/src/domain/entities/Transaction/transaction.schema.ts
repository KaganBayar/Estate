import {Prop, SchemaFactory , Schema } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose } from "mongoose";
import { Property } from "../Property/property.schema";
import { Agent } from "../Agent/agent.schema";

export type TransactionDocument = HydratedDocument<Transaction>;

export class Transaction {
    @Prop({required: true , type: mongoose.Schema.Types.ObjectId , ref: 'Property'})
    property : Property
    
    @Prop({required: true , type: mongoose.Schema.Types.ObjectId , ref: 'Agent'})
    sellingAgent : Agent

    @Prop({required: true , type: mongoose.Schema.Types.ObjectId , ref: 'Agent'})
    listingAgent : Agent

    @Prop({ 
        type: String, 
        enum: ['agreement', 'earnest_money', 'title_deed', 'completed'], 
        default: 'agreement' 
    })
    stage: string;

    @Prop({required: true})
    name : string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);