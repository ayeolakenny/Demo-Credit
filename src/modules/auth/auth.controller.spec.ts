import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(() => {
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should return a boolean', async () => {
      expect(
        controller.signup({
          name: 'Ayeola Kehinde',
          email: 'ayeolakenny@gmail.com',
          password: 'password',
        }),
      ).toBeTruthy();

      expect(mockAuthService.signup).toHaveBeenCalled();
    });
  });
});
