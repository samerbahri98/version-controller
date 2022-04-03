// user.decorator.ts
import { createParamDecorator } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (data, req) => req.user_id,
);