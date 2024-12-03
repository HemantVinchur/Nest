import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUser = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email: email,
          password: password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  // can create an instance of AuthService
  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  // creates a new user with a salted and hashed password
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('abc@gmail.com', '123');
    expect(user).not.toEqual('123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  // it('throw an error if a user signup with an existing email id', async (done) => {
  //   fakeUsersService.find = () =>
  //     Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
  //   try {
  //     await service.signup('abc@gmail.com', '123');
  //   } catch (err) {
  //     done();
  //   }
  // });

  // throws an error if user signs up with email that is in use
  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('abc@gmail.com', '123')).rejects.toThrow(
      BadRequestException,
    );
  });

  // throws if signin is called with an unused email
  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  // throws if an invalid password is provided
  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  // return a user if correct password is provided
  it('return a user if correct password is provided', async () => {
    await service.signup('hemant07@gmail.com', 'Gattoo@123');
    const user = await service.signin('hemant07@gmail.com', 'Gattoo@123');
    expect(user).toBeDefined();
  });

  // it('throws an error if user signs up with email that is in use', async () => {
  //   await service.signup('asdf@asdf.com', 'asdf');
  //   await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
  //     BadRequestException,
  //   );
  // });

  // it('throws if signin is called with an unused email', async () => {
  //   await expect(
  //     service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
  //   ).rejects.toThrow(NotFoundException);
  // });

  // it('throws if an invalid password is provided', async () => {
  //   await service.signup('laskdjf@alskdfj.com', 'password');
  //   await expect(
  //     service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
  //   ).rejects.toThrow(BadRequestException);
  // });
});
