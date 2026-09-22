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
    username: process.env.SAUCE_DEMO_USERNAME!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
  lockedOut: {
    username: process.env.SAUCE_DEMO_LOCKED_OUT_USER!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
  problem: {
    username: process.env.SAUCE_DEMO_PROBLEM_USER!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
  performanceGlitch: {
    username: process.env.SAUCE_DEMO_PERFORMANCE_GLITCH_USER!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
  error: {
    username: process.env.SAUCE_DEMO_ERROR_USER!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
  visual: {
    username: process.env.SAUCE_DEMO_VISUAL_USER!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
};
