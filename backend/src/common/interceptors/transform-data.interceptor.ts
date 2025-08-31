import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { type ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class TransformDataInterceptor implements NestInterceptor {
  constructor(private readonly classToUse: ClassConstructor<unknown>) {}

  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.classToUse, data);
      }),
    );
  }
}
