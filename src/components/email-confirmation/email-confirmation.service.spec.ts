import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmationService } from './email-confirmation.service';

describe('EmailConfirmation', () => {
  let provider: EmailConfirmationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailConfirmationService],
    }).compile();

    provider = module.get<EmailConfirmationService>(EmailConfirmationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
