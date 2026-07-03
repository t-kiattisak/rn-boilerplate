const fs = require('node:fs');
const { createRequire } = require('node:module');
const path = require('node:path');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const escapeModule = require('escape-string-regexp');
const escape = escapeModule.default || escapeModule;
const glob = require('fast-glob');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * @param {string} projectRoot - The path of the app project (typically __dirname)
 * @param {Object} [options] - Configuration options.
 * @param {string[]} [options.conditions] - resolver conditions.
 * @returns {import('metro-config').MetroConfig}
 */
function getMetroConfig(projectRoot, options = {}) {
  const root = path.resolve(projectRoot, '../..');
  const conditions = options.conditions || ['source'];

  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8')
  );

  if (!pkg.workspaces) {
    throw new Error(
      `No 'workspaces' field found in the 'package.json' at '${root}'`
    );
  }

  const workspaces = pkg.workspaces.packages || pkg.workspaces;

  const packages = Object.fromEntries(
    workspaces
      .flatMap((pattern) =>
        glob.sync(pattern, {
          cwd: root,
          onlyDirectories: true,
          ignore: [`**/node_modules`, `**/.git`, `**/.yarn`],
        })
      )
      .map((p) => path.join(root, p))
      .filter((dir) => {
        if (path.relative(dir, projectRoot) === '') {
          return false;
        }
        return fs.existsSync(path.join(dir, 'package.json'));
      })
      .map((dir) => {
        const pak = JSON.parse(
          fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
        );

        return [pak.name, dir];
      })
  );

  if (pkg.name) {
    packages[pkg.name] = root;
  }

  const getPackageDir = (name) => {
    try {
      const requireInstance = createRequire(
        path.join(projectRoot, 'package.json')
      );
      return path.dirname(requireInstance.resolve(`${name}/package.json`));
    } catch {
      return [projectRoot, root]
        .map((d) => path.join(d, 'node_modules', name))
        .find((d) => fs.existsSync(d));
    }
  };

  const getPeerDeps = (name, seen = new Set()) => {
    if (seen.has(name)) {
      return [];
    }

    seen.add(name);

    const dir = getPackageDir(name);

    if (!dir) {
      return [];
    }

    const pak = JSON.parse(
      fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
    );

    if (!pak.peerDependencies) {
      return [];
    }

    return [
      ...Object.keys(pak.peerDependencies),
      ...Object.keys(pak.peerDependencies).flatMap((m) => getPeerDeps(m, seen)),
    ];
  };

  const peers = Object.values(packages)
    .flatMap((dir) => {
      const pak = JSON.parse(
        fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
      );

      return pak.peerDependencies ? Object.keys(pak.peerDependencies) : [];
    })
    .sort()
    .flatMap((m) => [m, ...getPeerDeps(m)])
    .filter(
      (m, i, self) => self.lastIndexOf(m) === i // Remove duplicates
    );

  const extraNodeModules = peers.reduce((acc, name) => {
    const dir = getPackageDir(name);

    if (dir) {
      acc[name] = dir;
    }

    return acc;
  }, {});

  extraNodeModules['@'] = path.resolve(projectRoot, 'src');

  const blockList = Object.values(packages)
    .flatMap((dir) =>
      peers.map((m) => {
        const peerPath = path.join(dir, 'node_modules', m);

        if (extraNodeModules[m] === peerPath) {
          return null;
        }

        return new RegExp(
          `^${escape(path.join(dir, 'node_modules', m))}[/\\\\]`
        );
      })
    )
    .filter((value) => value != null);

  if (pkg.name) {
    extraNodeModules[pkg.name] = root;
  }

  const defaultConfig = getDefaultConfig(projectRoot);
  const { assetExts, sourceExts } = defaultConfig.resolver;

  const config = {
    projectRoot,
    watchFolders: [root],
    resolver: {
      assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'lottie'],
      sourceExts: [...sourceExts, 'svg'],

      blockList: [
        ...[defaultConfig.resolver.blockList].flat().filter(Boolean),
        ...blockList,
      ],

      extraNodeModules: {
        ...defaultConfig.resolver.extraNodeModules,
        ...extraNodeModules,
      },

      resolveRequest: (originalContext, moduleName, platform) => {
        let context = originalContext;

        if (Object.keys(packages).some((name) => moduleName.startsWith(name))) {
          context = {
            ...context,
            mainFields: [...conditions, ...context.mainFields],
            unstable_conditionNames: [
              ...conditions,
              ...context.unstable_conditionNames,
            ],
          };
        }

        if (defaultConfig.resolver.resolveRequest) {
          return defaultConfig.resolver.resolveRequest(
            context,
            moduleName,
            platform
          );
        } else {
          return context.resolveRequest(context, moduleName, platform);
        }
      },
    },

    transformer: {
      babelTransformerPath: require.resolve(
        'react-native-svg-transformer/react-native'
      ),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };

  return wrapWithReanimatedMetroConfig(mergeConfig(defaultConfig, config));
}

module.exports = getMetroConfig;
