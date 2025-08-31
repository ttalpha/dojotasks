import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput, UpdateTaskInput } from './inputs';
import { Prisma, Task, TaskStatus } from '../../generated/prisma';
import { taskFixture } from './test-utils';
import { PostgresErrorCode } from '../prisma/error.enum';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;
  let task: Task;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
    task = taskFixture();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const input: CreateTaskInput = {
        title: 'Task 1',
        assigneeIds: [1, 2, 3],
        projectId: 1,
        status: TaskStatus.IN_PROGRESS,
      };

      jest.spyOn(prisma.task, 'create').mockResolvedValue(task);
      const newTask = await service.create(input);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          title: input.title,
          assignees: { connect: input.assigneeIds.map((id) => ({ id })) },
          status: input.status,
          projectId: input.projectId,
        },
        include: {
          assignees: true,
        },
      });
      expect(newTask).toEqual(task);
    });
  });

  describe('updateTask', () => {
    it('should update the task', async () => {
      const input: UpdateTaskInput = {
        id: 1,
        title: 'Task 1',
        assigneeIds: [1, 2, 3],
        status: TaskStatus.IN_PROGRESS,
      };

      jest.spyOn(prisma.task, 'update').mockResolvedValue(task);
      const updated = await service.update(input);
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: task.id },
        data: {
          title: input.title,
          assignees: { set: input.assigneeIds?.map((id) => ({ id })) },
          status: input.status,
        },
        include: {
          assignees: true,
        },
      });
      expect(updated).toEqual(task);
    });

    it('should throw a NotFoundException if task is not found', async () => {
      const input: UpdateTaskInput = {
        id: 1,
        title: 'Task 1',
        assigneeIds: [1, 2, 3],
        status: TaskStatus.IN_PROGRESS,
      };

      jest.spyOn(prisma.task, 'update').mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', {
          clientVersion: '6.0.0',
          code: PostgresErrorCode.RecordNotFound,
        }),
      );

      expect(service.update(input)).rejects.toThrow(NotFoundException);
    });

    it('should throw a InternalServerErrorException if task is not found', async () => {
      const input: UpdateTaskInput = {
        id: 1,
        title: 'Task 1',
        assigneeIds: [1, 2, 3],
        status: TaskStatus.IN_PROGRESS,
      };

      jest.spyOn(prisma.task, 'update').mockRejectedValue(new Error());

      expect(service.update(input)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
