import { Test, TestingModule } from '@nestjs/testing';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { userFixture } from '../users/test-utils';

describe('CommentsResolver', () => {
  let resolver: CommentsResolver;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsResolver,
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CommentsResolver>(CommentsResolver);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const newComment = { id: 1, text: 'Comment 1', authorId: 2, taskId: 3 };
      const user = userFixture();
      jest.spyOn(service, 'create').mockResolvedValue(newComment as any);
      const result = await resolver.createComment(
        { taskId: 3, text: 'comment 1' },
        user,
      );
      expect(result).toEqual(newComment);
      expect(service.create).toHaveBeenCalledWith(
        { taskId: 3, text: 'comment 1' },
        user.id,
      );
    });
  });
});
