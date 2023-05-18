import { Test, TestingModule } from '@nestjs/testing';
import { AadhaarkycService } from './aadhaarkyc.service';

describe('AadhaarkycService', () => {
  let service: AadhaarkycService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AadhaarkycService],
    }).compile();

    service = module.get<AadhaarkycService>(AadhaarkycService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
