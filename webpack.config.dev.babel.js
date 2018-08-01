import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [path.resolve(__dirname, `./src/test.js`)],
    output: {
        pathinfo: true,
        filename: 'finam-export.js'
    },
    watch: true,
    plugins: [new CleanWebpackPlugin(['dist'])]
});

export default config;
