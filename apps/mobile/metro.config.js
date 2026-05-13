const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so Metro picks up changes in packages/
config.watchFolders = [workspaceRoot];

// Resolve modules from both the project root and the workspace root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Force all React-family and Redux packages to the single app-local copy.
// Without this, Metro can bundle two copies of React when workspace packages
// (react-redux, RTK) resolve 'react' from a different node_modules than the app,
// causing the "Invalid hook call / useContext is null" crash on web.
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-redux': path.resolve(projectRoot, 'node_modules/react-redux'),
  '@reduxjs/toolkit': path.resolve(projectRoot, 'node_modules/@reduxjs/toolkit'),
};

module.exports = config;
