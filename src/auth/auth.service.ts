/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
// import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { fullname, username, email, password } = signUpDto;
    console.log("email", email);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        fullname,
        username,
        email,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token };
    } catch (error) {
      // Handle the error and log it
      console.error(error);
      throw new Error("User registration failed.");
    }
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;

    // Find the user by username in your database
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException("invalid Email or password");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // If the username and password are correct, generate a JWT token
    const token = this.jwtService.sign({ id: user._id });

    return await this.getUserFromToken(token);
  }

  async getUserFromToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      // The decodedToken will contain the payload you signed in the token
      // You can extract user information or any other data from it
      const userId = decodedToken.id; // Assuming you have stored the user ID in the token
      // Fetch user details from your database based on the user ID
      const user = await this.userModel.findById(userId); // Replace with your actual user fetching logic
      return user;
    } catch (error) {
      // Handle token verification errors here (e.g., expired token, invalid token)
      throw new Error('Token verification failed');
    }
  }
}
