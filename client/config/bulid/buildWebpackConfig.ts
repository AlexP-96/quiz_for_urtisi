import { BuildOptions } from './types/config';
import * as webpack from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildResolve } from './bulidResolve';
import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {
        mode,
        paths,
        isDev,
    } = options;

    return {
        mode: mode,
        entry: paths.entry,
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolve(options),
        output: {
            filename: '[name].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        devtool: isDev
            ? 'inline-source-map'
            : undefined,
        devServer: isDev
            ? buildDevServer(options)
            : undefined,
    };
}