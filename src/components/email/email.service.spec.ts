import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

describe('Email', () => {
  let provider: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    provider = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
