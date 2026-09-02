import type { LoginUser } from '@pom/pages/LoginPage';

type Users = {
  standard: LoginUser;
  lockedOut: LoginUser;
  problem: LoginUser;
  performanceGlitch: LoginUser;
  error: LoginUser;
  visual: LoginUser;
};

export const users: Users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
};
