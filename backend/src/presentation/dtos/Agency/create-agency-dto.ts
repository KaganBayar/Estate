import { IsString, IsNumber, Min } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  totalMoney: number;
}
