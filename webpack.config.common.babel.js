import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, `./src/index.js`)
    ],
    output: {
        path: path.resolve(__dirname, `./dist`),
        publicPath: 'dist',
    },
    target: 'node',
    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
        ]
    },
    plugins: []
};
