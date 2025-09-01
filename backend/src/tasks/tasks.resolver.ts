import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './inputs/create-task.input';
import { TasksService } from './tasks.service';
import { UpdateTaskInput } from './inputs';
import { Inject, UseGuards } from '@nestjs/common';
import { CookieAuthGuard } from '../auth/guards';
import { PubSubEvent } from '../common/events/enum';
import { PUB_SUB } from '../pub-sub/constants';
import { PubSub } from 'graphql-subscriptions';
import { detectProfanity } from '../common/utils';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @UseGuards(CookieAuthGuard)
  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @UseGuards(CookieAuthGuard)
  @Mutation(() => Task)
  async updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    const updatedTask = await this.tasksService.update(updateTaskInput);
    await this.pubSub.publish(PubSubEvent.TaskUpdated, updatedTask);
    return updatedTask;
  }

  @Subscription(() => Task, {
    filter: (payload: Task) => {
      // if returns true, the event is triggered
      return !detectProfanity(payload.title);
    },
  })
  taskUpdated() {
    return this.pubSub.asyncIterableIterator<Task>(PubSubEvent.TaskUpdated);
  }
}
