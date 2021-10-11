import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ListOptions = createParamDecorator(
  (data: unknown, req: ExecutionContext) => {
    let { categories, tags } = req.switchToHttp().getRequest().query;

    if (categories) {
      categories = categories.split('-');
    }

    if (tags) {
      tags = tags.split('-');
    }

    return { categories, tags };
  },
);
