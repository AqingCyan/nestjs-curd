import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ListOptions = createParamDecorator(
  (data: unknown, req: ExecutionContext) => {
    let { categories, tags, page, limit } = req
      .switchToHttp()
      .getRequest().query;

    if (categories) {
      categories = categories.split('-');
    }

    if (tags) {
      tags = tags.split('-');
    }

    if (page) {
      page = parseInt(page, 10);
    } else {
      page = 1;
    }

    if (limit) {
      limit = parseInt(limit, 10);
    } else {
      limit = 3;
    }

    return { categories, tags, page, limit };
  },
);
