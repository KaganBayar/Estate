import {CreatePropertyDto} from "../Property/create-property-dto"
import {CreateTransactionDto} from "../Transaction/create-transaction-dto" 
import {Agent} from "../../../domain/entities/Agent/agent.schema" //[UPDATE NEEDED IMPORT ÇOK KÖTÜ]
import {Property} from "../../../domain/entities/Property/property.schema"
import {Transaction} from "../../../domain/entities/Transaction/transaction.schema"
import { CreateAgentDto } from "../Agent/create-agent-dto"
import { UpdateQuery } from "mongoose"


export type CreateDtoFor<T> =
  T extends Agent       ? CreateAgentDto :
  T extends Property    ? CreatePropertyDto :
  T extends Transaction ? CreateTransactionDto :
  never;

// Düz alan güncellemesi ({ name: 'Ali' }) ve
// MongoDB operatörleri ({ $set: { name: 'Ali' }, $inc: { totalDeals: 1 } }) destekler
export type UpdateDtoFor<T> = UpdateQuery<CreateDtoFor<T>>;

