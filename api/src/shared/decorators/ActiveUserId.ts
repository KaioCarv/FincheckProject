/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
