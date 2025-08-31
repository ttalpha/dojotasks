import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from './inputs';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { Task } from './entities/task.entity';
import { PostgresErrorCode } from '../prisma/error.enum';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create({
    assigneeIds,
    projectId,
    status,
    title,
  }: CreateTaskInput): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data: {
        assignees: { connect: assigneeIds.map((id) => ({ id })) },
        title,
        status,
        projectId,
      },
      include: { assignees: true },
    });
    return newTask;
  }

  async update({ id, title, status, assigneeIds }: UpdateTaskInput) {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: {
          assignees: { set: assigneeIds?.map((id) => ({ id })) },
          title,
          status,
        },
        include: { assignees: true },
      });
      return updatedTask;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === PostgresErrorCode.RecordNotFound)
          throw new NotFoundException('Cannot find task with the given id');
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
