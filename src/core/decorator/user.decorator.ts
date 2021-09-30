import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, req: ExecutionContext) =>
    req.switchToHttp().getRequest().user,
);
