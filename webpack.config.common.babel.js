import path from 'path';

export default  {
    entry: ['whatwg-fetch', 'babel-polyfill', path.resolve(__dirname, `./src/index.js`)],
    output: {
        path: path.resolve(__dirname, `./dist`) ,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 8000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[name].[ext]',
                    outputPath: __dirname + 'fonts/'
                }
            },
        ]
    },
    plugins: [
    ]
};