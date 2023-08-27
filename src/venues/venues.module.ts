// src/modules/venues/venues.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VenuesController } from './venues.controller';
import { VenuesService } from './venues.service';
import { VenueSchema } from './schemas/venue.schema'; // Import the VenueSchema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Venue', schema: VenueSchema }]), // Use 'Venue' as the model name
  ],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
