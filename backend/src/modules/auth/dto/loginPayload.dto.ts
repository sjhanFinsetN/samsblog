import { User } from '@prisma/client';
import { TokenDto } from './token.dto';

export class LoginPayloadDto {
  user: User;
  token: TokenDto;

  constructor(user: User, token: TokenDto) {
    this.user = user;
    this.token = token;
  }
}
