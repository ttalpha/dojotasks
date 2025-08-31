import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './inputs/create-task.input';
import { TasksService } from './tasks.service';
import { UpdateTaskInput } from './inputs';
import { UseGuards } from '@nestjs/common';
import { CookieAuthGuard } from '../auth/guards';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(CookieAuthGuard)
  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @UseGuards(CookieAuthGuard)
  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput);
  }
}
