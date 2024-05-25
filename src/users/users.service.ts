import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dtos/create-user.dto';
import { ResponseUsersDto } from './dtos/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUsersDto): Promise<ResponseUsersDto> {
    const userFound = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });
    if (userFound) throw new ConflictException('User already exists');

    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pattern.test(dto.password)) {
      throw new ConflictException(
        'Password must have at least 8 characters, 1 uppercase letter, 1 number and 1 special character',
      );
    }

    const passwordHash = hashSync(dto.password, Number(process.env.HASH_SALT));

    const data = {
      ...dto,
      password: passwordHash,
    };

    const user = await this.prisma.user.create({
      data,
      include: { Posts: true },
    });

    return user;
  }
}
