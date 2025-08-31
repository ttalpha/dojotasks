import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { PostgresErrorCode } from '../prisma/error.enum';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, memberIds }: CreateProjectInput): Promise<Project> {
    try {
      const newProject = await this.prisma.project.create({
        data: {
          name,
          members: { connect: memberIds.map((id) => ({ id })) },
        },
        include: { members: true },
      });
      return { ...newProject, tasks: [] };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.RecordNotFound) {
          throw new BadRequestException('One or more members are not found');
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      include: {
        members: true,
        tasks: {
          include: { assignees: true, comments: { include: { author: true } } },
        },
      },
    });
    return projects;
  }

  async findOne(id: number): Promise<Project | null> {
    const newProject = await this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          include: { assignees: true, comments: { include: { author: true } } },
        },
        members: true,
      },
    });
    return newProject;
  }
}
