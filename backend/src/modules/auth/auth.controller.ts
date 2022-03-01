import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { LoginPayloadDto } from './dto/loginPayload.dto';

@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginPayloadDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@AuthUser() user: User): Promise<User> {
    return this.authService.getProfile(user);
  }
}
