import { defaults } from 'jest-config';
import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};

export default config;