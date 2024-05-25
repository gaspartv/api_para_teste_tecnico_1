import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { IsPublic } from 'src/auth/decorators/is-public';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateUsersDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ResponseUsersDto } from './dtos/response-user.dto';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post('create')
  @HttpCode(201)
  @ApiResponse({ status: 201, type: ResponseUsersDto })
  async create(@Body() body: CreateUsersDto): Promise<ResponseUsersDto> {
    return await this.usersService.create(body);
  }
}
