import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { CreatePropertyDto } from '@/presentation/dtos/Property/create-property-dto';
import { CreateTransactionDto } from '@/presentation/dtos/Transaction/create-transaction-dto';

describe('ValidationPipe', () => {
  let target: ValidationPipe;

  beforeEach(() => {
    target = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  });

  describe('CreatePropertyDto', () => {
    it('should pass with valid data', async () => {
      const data = {
        name: 'Luxury Villa',
        price: 1000000,
        earnestMoney: 50000,
      };
      const metadata = { type: 'body', metatype: CreatePropertyDto, data: '' };
      await expect(target.transform(data, metadata as any)).resolves.toEqual(
        data,
      );
    });

    it('should fail if name is missing', async () => {
      const data = {
        price: 1000000,
        earnestMoney: 50000,
      };
      const metadata = { type: 'body', metatype: CreatePropertyDto, data: '' };
      await expect(target.transform(data, metadata as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should fail if price is negative', async () => {
      const data = {
        name: 'Luxury Villa',
        price: -100,
        earnestMoney: 50000,
      };
      const metadata = { type: 'body', metatype: CreatePropertyDto, data: '' };
      await expect(target.transform(data, metadata as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('CreateTransactionDto', () => {
    it('should fail with invalid MongoId', async () => {
      const data = {
        name: 'Trans 1',
        property: 'invalid-id',
        sellingAgent: '507f1f77bcf86cd799439011',
        listingAgent: '507f1f77bcf86cd799439011',
        totalServiceFee: 1000,
      };
      const metadata = {
        type: 'body',
        metatype: CreateTransactionDto,
        data: '',
      };
      await expect(target.transform(data, metadata as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should fail with invalid stage', async () => {
      const data = {
        name: 'Trans 1',
        property: '507f1f77bcf86cd799439011',
        sellingAgent: '507f1f77bcf86cd799439011',
        listingAgent: '507f1f77bcf86cd799439011',
        totalServiceFee: 1000,
        stage: 'invalid_stage',
      };
      const metadata = {
        type: 'body',
        metatype: CreateTransactionDto,
        data: '',
      };
      await expect(target.transform(data, metadata as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
