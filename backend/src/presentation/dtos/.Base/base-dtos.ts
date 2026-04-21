import { CreatePropertyDto } from "../Property/create-property-dto";
import { CreateTransactionDto } from "../Transaction/create-transaction-dto";
import { CreateAgentDto } from "../Agent/create-agent-dto";
import { CreateAgencyDto } from "../Agency/create-agency-dto";
import { Agent } from "@/domain/entities/Agent/agent.schema";
import { Property } from "@/domain/entities/Property/property.schema";
import { Transaction } from "@/domain/entities/Transaction/transaction.schema";
import { Agency } from "@/domain/entities/Agency/agency.schema";
import { UpdateQuery } from "mongoose";

export type CreateDtoFor<T> =
  T extends Agency      ? CreateAgencyDto :
  T extends Agent       ? CreateAgentDto :
  T extends Property    ? CreatePropertyDto :
  T extends Transaction ? CreateTransactionDto :
  never;

// Düz alan güncellemesi ({ name: 'Ali' }) ve
// MongoDB operatörleri ({ $set: { name: 'Ali' }, $inc: { totalDeals: 1 } }) destekler
export type UpdateDtoFor<T> = UpdateQuery<CreateDtoFor<T>>;

