import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: PrismaService,
          useValue: {
            comment: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment', async () => {
      const newComment = {
        taskId: 2,
        text: 'Comment 1',
        id: 1,
      };
      jest.spyOn(prisma.comment, 'create').mockResolvedValue(newComment as any);
      const authorId = 2;
      const result = await service.create(
        { taskId: 1, text: 'Comment 1' },
        authorId,
      );
      expect(prisma.comment.create).toHaveBeenCalledWith({
        data: {
          text: 'Comment 1',
          taskId: 1,
          authorId,
        },
        include: { author: true },
      });
      expect(result).toEqual(newComment);
    });
  });
});
