import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('Password', () => {
  let provider: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    provider = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
