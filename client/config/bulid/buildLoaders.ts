import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
//@ts-ignore
import sass from 'sass';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const scssLoader =
        {
            test: /\.s[ac]ss$/i,
            use: [
                options.isDev
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resourcePath: string) => Boolean(resourcePath.includes('.module.')),
                            namedExport: false,
                            localIdentName: options.isDev
                                ? '[path][name]__[local]--[hash:base64:5]'
                                : '[hash:base64:8]',
                        },
                    },
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: sass,
                        api: 'modern-compiler',
                    },
                },
            ],
        };
    return [
        typescriptLoader,
        scssLoader,
    ];
}