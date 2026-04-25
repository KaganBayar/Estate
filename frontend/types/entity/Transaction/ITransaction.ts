import type { IAgent } from '../Agent/IAgent'
import type { IProperty } from '../Property/IProperty'
import type { TransactionStatus } from './transactionStatus'

export interface ITransaction {
  _id: string
  name: string
  totalServiceFee: number
  stage: TransactionStatus
  listingAgent: IAgent
  sellingAgent: IAgent
  property: IProperty
  createdAt: string
}
