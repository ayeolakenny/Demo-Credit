import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    findOne: jest.fn(() => {
      return {
        id: 5,
        name: 'John Doe',
        email: 'john@gmail.com',
        createdAt: '2022-10-13T19:19:32.000Z',
        updatedAt: '2022-10-13T19:19:32.000Z',
      };
    }),

    findAll: jest.fn(() => {
      return [
        {
          id: 5,
          name: 'John Doe',
          email: 'john@gmail.com',
          createdAt: '2022-10-13T19:19:32.000Z',
          updatedAt: '2022-10-13T19:19:32.000Z',
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single user object', async () => {
      const result = {
        id: 5,
        name: 'John Doe',
        email: 'john@gmail.com',
        createdAt: '2022-10-13T19:19:32.000Z',
        updatedAt: '2022-10-13T19:19:32.000Z',
      };
      expect(mockUserService.findOne()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return a array of users', async () => {
      const result = [
        {
          id: 5,
          name: 'John Doe',
          email: 'john@gmail.com',
          createdAt: '2022-10-13T19:19:32.000Z',
          updatedAt: '2022-10-13T19:19:32.000Z',
        },
      ];
      expect(mockUserService.findAll()).toEqual(result);
    });
  });
});
