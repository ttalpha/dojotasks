import { Test, TestingModule } from '@nestjs/testing';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskStatus } from '../../generated/prisma';
import { CreateTaskInput, UpdateTaskInput } from './inputs';
import { taskFixture } from './test-utils';

describe('TasksResolver', () => {
  let resolver: TasksResolver;
  let service: TasksService;
  let prisma: PrismaService;
  let task: Task;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolver,
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

    resolver = module.get<TasksResolver>(TasksResolver);
    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
    task = taskFixture();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = {
        id: 1,
        title: 'Task 1',
        status: TaskStatus.IN_PROGRESS,
        projectId: 1,
        createdAt: new Date(),
      };

      const input: CreateTaskInput = {
        title: 'Task 1',
        assigneeIds: [1, 2, 3],
        projectId: 1,
        status: TaskStatus.IN_PROGRESS,
      };

      jest.spyOn(prisma.task, 'create').mockResolvedValue(newTask);
      jest.spyOn(service, 'create');

      const result = await resolver.createTask(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(newTask);
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
      jest.spyOn(service, 'update');
      const updated = await resolver.updateTask(input);
      expect(service.update).toHaveBeenCalledWith(input);
      expect(updated).toEqual(task);
    });
  });
});
