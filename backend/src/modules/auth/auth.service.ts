import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UtilsProvider } from 'src/providers/utils.provider';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly prismaService: PrismaService,
  ) {}

  async createToken(user: User): Promise<TokenDto> {
    return new TokenDto({
      expiresIn: 3600,
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        username: user.username,
      }),
    });
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    const isPasswordValid = await UtilsProvider.validateHash(
      loginDto.password,
      user.password,
    );
    if (!user || !isPasswordValid) {
      throw new NotFoundException();
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.createToken(user);

    const loginPayload = new LoginPayloadDto(user, token);

    return loginPayload;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (foundUser) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }

    // Check email format (BE side too)
    let pattern="";
    registerDto.email;


    const newUser = await this.prismaService.user.create({
      data: {
        email: registerDto.email,
        username: registerDto.username,
        password: UtilsProvider.generateHash(registerDto.password),
      },
    });

    return newUser;
  }

  async getProfile(user: User) {
    return user;
  }
}
