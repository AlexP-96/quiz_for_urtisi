import * as webpack from 'webpack';
// @ts-ignore
import htmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new webpack.ProgressPlugin(),
        new htmlWebpackPlugin({ template: paths.html }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.ProvidePlugin({ process: 'process' }),
    ];
}