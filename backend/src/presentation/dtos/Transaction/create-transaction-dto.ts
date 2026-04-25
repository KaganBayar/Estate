import {
  IsString,
  IsNumber,
  Min,
  IsEnum,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  name: string;

  @IsMongoId()
  property: string; // Property ObjectId

  @IsMongoId()
  sellingAgent: string; // Agent ObjectId

  @IsMongoId()
  listingAgent: string; // Agent ObjectId

  @IsNumber()
  @Min(0)
  totalServiceFee: number;

  @IsOptional()
  @IsEnum(['agreement', 'earnest_money', 'title_deed', 'completed'])
  stage?: 'agreement' | 'earnest_money' | 'title_deed' | 'completed';
}
