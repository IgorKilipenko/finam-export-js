import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import webpack from 'webpack';
import CleanWebpackPlugin  from 'clean-webpack-plugin';

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        pathinfo: true,
        filename: 'bundle.js'
    },
    watch: true,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NamedModulesPlugin(),
    ]
});

export default config;