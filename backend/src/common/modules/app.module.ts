import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/controllers/app.controller';
import { AppService } from '../../infrastructure/services/app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION!),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
