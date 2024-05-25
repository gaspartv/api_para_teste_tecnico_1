import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreatePostsDto } from './dtos/create-posts.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';
import { ResponsePostsDto } from './dtos/response-posts.dto';
import { UpdatePostsDto } from './dtos/update-posts.dto';
import { ResponseMessageDto } from './dtos/response-message.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostsDto): Promise<ResponsePostsDto> {
    const userFound = await this.prisma.user.findUnique({
      where: { id: data.authorId },
    });
    if (!userFound) throw new ConflictException('user not found');

    const post = await this.prisma.post.create({ data });

    return post;
  }

  async list(): Promise<ResponsePostsDto[]> {
    const posts = await this.prisma.post.findMany();

    return posts;
  }

  async delete(postId: string): Promise<ResponseMessageDto> {
    const postFound = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postFound) throw new ConflictException('post not found');

    await this.prisma.post.delete({ where: { id: postId } });

    return { message: 'post deleted' };
  }

  async edit(postId: string, data: UpdatePostsDto): Promise<ResponsePostsDto> {
    const postFound = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postFound) throw new ConflictException('post not found');

    const post = await this.prisma.post.update({ where: { id: postId }, data });

    return post;
  }
}
