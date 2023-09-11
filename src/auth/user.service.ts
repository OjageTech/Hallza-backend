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

  async findOne(username: object, password: string): Promise<User | null> {
    const userObj = await this.userModel.findOne({ username });

    if (userObj) {
      const isPasswordValid = await bcrypt.compare(password, userObj.password);

      if (isPasswordValid) {
        return userObj; // Return the entire user object
      }
    }

    throw new Error('Credentials not matched!');
  }

  async findById(id: string): Promise<User | null> {
    // Find a user by their ID in the database
    return this.userModel.findById(id).exec();
  }

  public async validatePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    // Validate the user's password by comparing the hashed password
    // stored in the database with the provided password

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }
}
