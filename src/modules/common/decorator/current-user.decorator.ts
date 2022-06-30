import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { writeFile } from 'fs'

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);