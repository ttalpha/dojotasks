import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, memberIds }: CreateProjectInput): Promise<Project> {
    const newProject = await this.prisma.project.create({
      data: {
        name,
        members: { connect: memberIds.map((id) => ({ id })) },
      },
      include: { members: true },
    });
    return { ...newProject, tasks: [] };
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      select: { id: true, name: true, createdAt: true },
    });
    return projects.map((p) => ({ ...p, tasks: [], members: [] }));
  }

  async findOne(id: number): Promise<Project | null> {
    const newProject = await this.prisma.project.findUnique({
      where: { id },
      include: { tasks: { include: { assignees: true } }, members: true },
    });
    return newProject;
  }
}
