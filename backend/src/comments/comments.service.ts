import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommentInput } from './inputs';
import { Comment } from './entities/comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { PostgresErrorCode } from '../prisma/error.enum';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    { taskId, text }: CreateCommentInput,
    authorId: number,
  ): Promise<Comment> {
    try {
      const newComment = await this.prisma.comment.create({
        data: {
          text,
          taskId,
          authorId,
        },
        include: { author: true },
      });
      return newComment;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.ForeignViolation) {
          throw new BadRequestException(`Cannot find the task ID: ${taskId}`);
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
