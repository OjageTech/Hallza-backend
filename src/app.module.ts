import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenuesModule } from './venues/venues.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://salathielojage:g9WJiRkoyPQY7w8u@initialcluster.eu2cnk6.mongodb.net/?retryWrites=true&w=majority',
    ),
    VenuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
