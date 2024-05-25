import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dtos/create-posts.dto';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ResponsePostsDto } from './dtos/response-posts.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { ResponseMessageDto } from './dtos/response-message.dto';
import { UpdatePostsDto } from './dtos/update-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @HttpCode(201)
  @ApiResponse({ status: 201, type: ResponsePostsDto })
  async create(@Body() body: CreatePostsDto): Promise<ResponsePostsDto> {
    return await this.postsService.create(body);
  }

  @Get('list')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: [ResponsePostsDto] })
  async list(): Promise<ResponsePostsDto[]> {
    return await this.postsService.list();
  }

  @Delete('delete/:postId')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: ResponseMessageDto })
  async delete(
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<ResponseMessageDto> {
    return await this.postsService.delete(postId);
  }

  @Patch('edit/:postId')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: ResponsePostsDto })
  async edit(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() body: UpdatePostsDto,
  ): Promise<ResponsePostsDto> {
    return await this.postsService.edit(postId, body);
  }
}
