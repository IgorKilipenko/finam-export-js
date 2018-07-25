import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import webpack from 'webpack';

const config = merge(common, {
    mode: 'development',
    //devtool: 'inline-source-map',
    devtool: '#source-map',
    output: {
        pathinfo: true,
        filename: 'bundle.js'
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NamedModulesPlugin(),
    ]
});

export default config;