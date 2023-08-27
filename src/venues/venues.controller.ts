// src/venues/venues.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { Venue } from './schemas/venue.schema';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Get()
  async findAll(): Promise<Venue[]> {
    return this.venuesService.findAll();
  }

  @Post()
  async create(@Body() venue: Venue): Promise<Venue> {
    return this.venuesService.create(venue);
  }

  // ... other routes
}
