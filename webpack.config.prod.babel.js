import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import webpack from 'webpack';

const config = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        pathinfo: true,
        filename: 'finam-export.js'
    },
    plugins: []
});

export default config;
