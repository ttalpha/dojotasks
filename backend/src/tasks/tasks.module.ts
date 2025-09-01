import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PubSubModule } from '../pub-sub/pubsub.module';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
