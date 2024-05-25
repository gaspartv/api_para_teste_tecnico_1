import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ResponseUsersDto } from 'src/users/dtos/response-user.dto';

export class ResponseSignDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @Type(() => ResponseUsersDto)
  user: ResponseUsersDto;
}
