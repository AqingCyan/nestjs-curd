import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ListOptions = createParamDecorator(
  (data: unknown, req: ExecutionContext) => {
    let { categories } = req.switchToHttp().getRequest().query;

    if (categories) {
      categories = categories.split('-');
    }

    return { categories };
  },
);
