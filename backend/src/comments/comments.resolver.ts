import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CookieAuthGuard } from '../auth/guards';
import { PubSubEvent } from '../common/events/enum';
import { replaceProfanity } from '../common/utils';
import { PUB_SUB } from '../pub-sub/constants';
import { CurrentUser } from '../users/decorators';
import { User } from '../users/entities/user.entity';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './inputs/create-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @UseGuards(CookieAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    const comment = await this.commentsService.create(
      createCommentInput,
      user.id,
    );
    await this.pubSub.publish(PubSubEvent.CommentAdded, comment);
    return comment;
  }

  @Subscription(() => Comment, {
    resolve: function (this: CommentsResolver, payload: Comment) {
      return {
        ...payload,
        text: replaceProfanity(payload.text),
      };
    },
  })
  commentAdded() {
    return this.pubSub.asyncIterableIterator(PubSubEvent.CommentAdded);
  }
}
