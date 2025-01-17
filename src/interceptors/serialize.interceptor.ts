import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToInstance} from 'class-transformer';

interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){
            
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before the request is handled by the request handler
        console.log("I am running before the handler", next);
        return next.handle().pipe(
            map((data:any)=>{
                // Run something before the response is sent
                console.log("I am running before the response is sent out",data);
                return plainToInstance(this.dto, data,{
                    excludeExtraneousValues:true
                })
            })
        )
    }
}