/* eslint-disable prettier/prettier */
// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ unique: [true, "Duplicate email entered"] })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
