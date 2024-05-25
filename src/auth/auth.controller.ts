import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { SignDto } from './dtos/sign.dto';
import { ResponseSignDto } from './dtos/response-sign.dto';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200, type: ResponseSignDto })
  async signIn(@Body() body: SignDto): Promise<ResponseSignDto> {
    return await this.authService.signIn(body);
  }
}
