// src/venues/schemas/venue.schema.ts
import { Schema, Document } from 'mongoose';

export interface Venue extends Document {
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  capacity: number;
  amenities: string[];
  photos: string[];
  owner: {
    id: string;
    name: string;
    email: string;
  };
  price_per_day: number;
  rating: number;
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
  availability: {
    start_date: string;
    end_date: string;
    available_slots: {
      start_time: string;
      end_time: string;
    }[];
  };
  created_at: string;
  updated_at: string;
}

export const VenueSchema = new Schema<Venue>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  capacity: { type: Number, required: true },
  amenities: [{ type: String }],
  photos: [{ type: String }],
  owner: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  price_per_day: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  availability: {
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    available_slots: [
      {
        start_time: { type: String, required: true },
        end_time: { type: String, required: true },
      },
    ],
  },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
});
