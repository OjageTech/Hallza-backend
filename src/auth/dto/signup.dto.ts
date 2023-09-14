/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter the correct email" })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
