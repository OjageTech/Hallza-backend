import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenuesModule } from './venues/venues.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [VenuesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
