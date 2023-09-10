import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema'; // Import the User schema

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    // Create a new user document in the database
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(username: string): Promise<User | null> {
    // Find a user by their username in the database
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User | null> {
    // Find a user by their ID in the database
    return this.userModel.findById(id).exec();
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    // Validate the user's password by comparing the hashed password
    // stored in the database with the provided password
    return bcrypt.compare(password, user.password);
  }
}
