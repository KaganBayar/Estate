import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/controllers/app.controller';
import { AppService } from '../../app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
