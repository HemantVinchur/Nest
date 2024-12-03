import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
export declare class CurrentUserInterceptor implements NestInterceptor {
    private usersService;
    constructor(usersService: UsersService);
    intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<Observable<any>>;
}
