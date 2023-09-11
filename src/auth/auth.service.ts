import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    return this.userService.create(signUpDto);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    console.log('Username:', username);
    // Find the user by username in your database
    const presentUser = await this.userService.findOne({ username }, password);
    console.log('Present User:', presentUser);
    return presentUser;

  }

  async getUserFromToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      // The decodedToken will contain the payload you signed in the token
      // You can extract user information or any other data from it
      const userId = decodedToken.id; // Assuming you have stored the user ID in the token
      // Fetch user details from your database based on the user ID
      const user = await this.userService.findById(userId); // Replace with your actual user fetching logic
      return user;
    } catch (error) {
      // Handle token verification errors here (e.g., expired token, invalid token)
      throw new Error('Token verification failed');
    }
  }
}
