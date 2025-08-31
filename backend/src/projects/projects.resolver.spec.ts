import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsResolver } from './projects.resolver';
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

describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;
  let service: ProjectsService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsResolver,
        ProjectsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    resolver = module.get<ProjectsResolver>(ProjectsResolver);
    service = module.get<ProjectsService>(ProjectsService);
    prisma = module.get(PrismaService);
  });

  describe('createProject', () => {
    it('should create a project with members and return with empty tasks', async () => {
      const input: CreateProjectInput = {
        name: 'Integration Project',
        memberIds: [1, 2],
      };
      const mockProject = {
        id: 1,
        name: 'Integration Project',
        members: [{ id: 1 }, { id: 2 }],
      };

      jest.spyOn(prisma.project, 'create').mockResolvedValue(mockProject);

      const result = await resolver.createProject(input);

      expect(prisma.project.create).toHaveBeenCalledWith({
        data: {
          name: 'Integration Project',
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
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];
      jest.spyOn(service, 'findAll');
      jest.spyOn(prisma.project, 'findMany').mockResolvedValue(mockProjects);

      const result = await resolver.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 1, name: 'A', tasks: [], members: [] },
        { id: 2, name: 'B', tasks: [], members: [] },
      ]);
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

      jest.spyOn(service, 'findOne');
      jest.spyOn(prisma.project, 'findUnique').mockResolvedValue(mockProject);

      const result = await resolver.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProject);
    });

    it('should return null when project is not found', async () => {
      jest.spyOn(prisma.project, 'findUnique').mockResolvedValue(null);
      const result = await resolver.findOne(999);

      expect(result).toBeNull();
    });
  });
});
