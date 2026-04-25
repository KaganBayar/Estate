import { IsString, IsNumber, Min } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  earnestMoney: number;
}
