import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import webpack from 'webpack';
import CleanWebpackPlugin  from 'clean-webpack-plugin';

const config = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        pathinfo: true,
        filename: 'finam-export.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NamedModulesPlugin(),
    ]
});

export default config;