// src/modules/venues/dto/create-venue.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVenueDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
