export class CreateTransactionDto {
    name: string;
    property: string;       // Property ObjectId
    sellingAgent: string;   // Agent ObjectId
    listingAgent: string;   // Agent ObjectId
    stage?: 'agreement' | 'earnest_money' | 'title_deed' | 'completed';
}