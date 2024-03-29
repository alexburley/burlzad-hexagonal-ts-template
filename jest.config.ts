'use strict'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  displayName: {
    name: 'Tests',
    color: 'green',
  },
  verbose: !!process.env.CI,
  testTimeout: 30000,

  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },

  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'test/', 'scripts/'],

  globalSetup: '<rootDir>/src/test/global-setup.ts',
  globalTeardown: '<rootDir>/src/test/global-teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup-after-env.ts'],
}

export default config
