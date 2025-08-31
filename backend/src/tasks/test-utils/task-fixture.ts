import { Task, TaskStatus } from '../../../generated/prisma';

export const taskFixture = (attrs?: Partial<Task>): Task => {
  return {
    id: 1,
    projectId: 2,
    status: TaskStatus.TODO,
    title: 'Task 1',
    createdAt: new Date(),
    ...attrs,
  };
};
