import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

export default [
	{ ignores: ['dist'] },
	// Base config for all files
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: { react: { version: '18.3' } },
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'react/react-in-jsx-scope': 'off',
			'no-unused-vars': ['error', { 
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^(React|_)',
				destructuredArrayIgnorePattern: '^_'
			}],
			'react/prop-types': ['error', {
				ignore: ['className', 'children', 'classNames']
			}]
		},
	},
	// Test-specific config
	{
		files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
		plugins: {
			'jest-dom': jestDom,
			'testing-library': testingLibrary,
		},
		languageOptions: {
			globals: {
				...globals.jest,
				describe: true,
				it: true,
				expect: true,
				beforeEach: true,
				jest: true,
			}
		},
		rules: {
			...jestDom.configs.recommended.rules,
			...testingLibrary.configs.react.rules,
		}
	},
	// Cypress-specific config
	{
		files: ['**/cypress/**/*.{js,jsx}', 'cypress.config.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				cy: true,
				Cypress: true,
				describe: true,
				it: true,
				expect: true,
				beforeEach: true,
			}
		},
		rules: {
			'no-unused-vars': ['error', {
				argsIgnorePattern: '^(on|config|_)',
				varsIgnorePattern: '^_'
			}]
		}
	}
]
