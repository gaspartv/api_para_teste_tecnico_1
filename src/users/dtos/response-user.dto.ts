import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { ResponsePostsDto } from 'src/posts/dtos/response-posts.dto';
import { TypeNested } from 'src/utils/type-nested.decorator';

export class ResponseUsersDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;

  @IsString()
  password: string;

  @ApiProperty()
  @TypeNested(() => ResponsePostsDto)
  Posts: ResponsePostsDto[];
}
