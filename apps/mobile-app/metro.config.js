const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    resolveRequest: (context, moduleName, platform) => {
      // Intercept alias imports starting with "@/"
      if (moduleName.startsWith('@/')) {
        let targetPath;
        // If the import is made from a file under packages/ui-primitives
        if (context.originModulePath.includes('packages/ui-primitives')) {
          targetPath = path.resolve(workspaceRoot, 'packages/ui-primitives/src', moduleName.slice(2));
        } else {
          // Default mapping for mobile-app
          targetPath = path.resolve(projectRoot, 'src', moduleName.slice(2));
        }
        
        // Delegate to Metro's default resolver with resolved path
        return context.resolveRequest(context, targetPath, platform);
      }
      
      // Fallback to default Metro resolver
      return context.resolveRequest(context, moduleName, platform);
    }
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
