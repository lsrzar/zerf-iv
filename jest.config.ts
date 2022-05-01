import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
	return {
		verbose: true,
		preset: 'ts-jest',
		testEnvironment: 'node',
		testRegex: './tests/.*\\.(test|spec)?\\.(ts|ts)$',
		moduleFileExtensions: ['ts', 'js', 'json', 'node'],
		roots: ['<rootDir>/tests'],
	};
};
