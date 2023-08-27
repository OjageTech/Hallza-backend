// src/venues/venues.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venue } from './schemas/venue.schema';

@Injectable()
export class VenuesService {
  constructor(@InjectModel('Venue') private venueModel: Model<Venue>) {}

  async findAll(): Promise<Venue[]> {
    return this.venueModel.find().exec();
  }

  async create(venue: Venue): Promise<Venue> {
    const newVenue = new this.venueModel(venue);
    return newVenue.save();
  }

  // ... other methods
}
