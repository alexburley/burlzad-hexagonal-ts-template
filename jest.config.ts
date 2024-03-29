'use strict'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  // General config
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
  globalSetup: '<rootDir>/src/test/global-setup.ts',
  globalTeardown: '<rootDir>/src/test/global-teardown.ts',
}

export default config
