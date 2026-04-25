import { CreatePropertyDto } from '../Property/create-property-dto';
import { CreateTransactionDto } from '../Transaction/create-transaction-dto';
import { CreateAgentDto } from '../Agent/create-agent-dto';
import { CreateAgencyDto } from '../Agency/create-agency-dto';
import { Agent, AgentDocument } from '@/domain/entities/Agent/agent.schema';
import {
  Property,
  PropertyDocument,
} from '@/domain/entities/Property/property.schema';
import {
  Transaction,
  TransactionDocument,
} from '@/domain/entities/Transaction/transaction.schema';
import { Agency, AgencyDocument } from '@/domain/entities/Agency/agency.schema';
import { UpdateQuery } from 'mongoose';

export type CreateDtoFor<T> = T extends Agency
  ? CreateAgencyDto
  : T extends Agent
    ? CreateAgentDto
    : T extends Property
      ? CreatePropertyDto
      : T extends Transaction
        ? CreateTransactionDto
        : never;

export type TDocument<T> = T extends Agency
  ? AgencyDocument
  : T extends Agent
    ? AgentDocument
    : T extends Property
      ? PropertyDocument
      : T extends Transaction
        ? TransactionDocument
        : never;

export type UpdateDtoFor<T> = UpdateQuery<CreateDtoFor<T>>;
