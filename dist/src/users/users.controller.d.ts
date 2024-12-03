import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    setColor(color: string, session: any): void;
    getColor(session: any): any;
    whoAmI(user: User): User;
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signin(body: CreateUserDto, session: any): Promise<User>;
    signout(session: any): Promise<string>;
    findUser(id: string): Promise<User>;
    findAllUser(email: string): Promise<User[]>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
    removeUser(id: string): Promise<User>;
}
