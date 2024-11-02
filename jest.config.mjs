export default {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|webp|svg)$': './__mocks__/fileMock.js'
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest'
	},
	testEnvironmentOptions: {
		customExportConditions: ['react-native']
	},
	setupFiles: ['<rootDir>/jest.polyfills.js']
}; 