import { TestBed } from '@angular/core/testing';
import { ChallengeService } from './challenge';
import { ExperienceLevel, TechStack } from '../models/user';

describe('ChallengeService', () => {
  let service: ChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return challenge by stack', () => {
    const challenge = service.getChallengeByStack(TechStack.React);
    expect(challenge?.stack).toBe(TechStack.React);
  });

  it('should return level by stack', () => {
    const level = service.getLevelByStack(TechStack.Vue);
    expect(level).toBe(ExperienceLevel.Middle);
  });

  it('should return null for unknown stack', () => {
    const challenge = service.getChallengeByStack('Rust' as any);
    expect(challenge).toBeNull();
  });
});