import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { IJwtPayload } from './interfaces/jwt-payload';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResponseUsersDto } from 'src/users/dtos/response-user.dto';
import { ResponseSignDto } from './dtos/response-sign.dto';
import { SignDto } from './dtos/sign.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(dto: SignDto): Promise<ResponseSignDto> {
    const userFound: ResponseUsersDto = await this.prisma.user.findUnique({
      where: { login: dto.login },
      include: { Posts: true },
    });
    if (!userFound) throw new ConflictException('user or password invalid');

    const passwordValid: boolean = await compare(
      dto.password,
      userFound.password,
    );
    if (!passwordValid) throw new ConflictException('user or password invalid');

    const expiresAt: Date = new Date();
    const expires_in: number = Number(process.env.JWT_EXPIRES_IN) * 1000;
    expiresAt.setTime(expiresAt.getTime() + expires_in);

    const payload: IJwtPayload = {
      sign: {
        sub: userFound.id,
      },
    };

    const token: string = this.jwtService.sign(payload);

    return {
      token,
      user: {
        ...userFound,
        password: undefined,
      },
    };
  }
}
