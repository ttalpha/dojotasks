import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';

const mockPrisma = {
  project: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    prisma = module.get(PrismaService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a project with members and return with empty tasks', async () => {
      const input: CreateProjectInput = {
        name: 'New Project',
        memberIds: [1, 2],
      };

      const mockProject = {
        id: 1,
        name: 'New Project',
        members: [{ id: 1 }, { id: 2 }],
      };

      prisma.project.create.mockResolvedValue(mockProject);

      const result = await service.create(input);

      expect(prisma.project.create).toHaveBeenCalledWith({
        data: {
          name: 'New Project',
          members: { connect: [{ id: 1 }, { id: 2 }] },
        },
        include: { members: true },
      });
      expect(result).toEqual({ ...mockProject, tasks: [] });
    });
  });

  describe('findAll', () => {
    it('should return all projects with empty tasks and members arrays', async () => {
      const mockProjects = [
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
      ];

      prisma.project.findMany.mockResolvedValue(mockProjects);

      const result = await service.findAll();

      expect(prisma.project.findMany).toHaveBeenCalledWith({
        select: { id: true, name: true },
      });
      expect(result).toEqual([
        { id: 1, name: 'Project A', tasks: [], members: [] },
        { id: 2, name: 'Project B', tasks: [], members: [] },
      ]);
    });

    it('should return empty array when no projects found', async () => {
      prisma.project.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a project with tasks and members', async () => {
      const mockProject = {
        id: 1,
        name: 'Project A',
        members: [{ id: 1 }],
        tasks: [{ id: 10, title: 'Task 1', assignees: [{ id: 1 }] }],
      };

      prisma.project.findUnique.mockResolvedValue(mockProject);

      const result = await service.findOne(1);

      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { tasks: { include: { assignees: true } }, members: true },
      });
      expect(result).toEqual(mockProject);
    });

    it('should return null if project is not found', async () => {
      prisma.project.findUnique.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });
});
