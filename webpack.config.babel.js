import path from 'path';
import config from 'config';

const { HOST, PORT } = config.get('client');

export default {
    entry: './client/src/index.js',
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/,
                issuer: /\.js?$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'client/src/assets'),
            components: path.resolve(__dirname, 'client/src/components'),
            hooks: path.resolve(__dirname, 'client/src/hooks'),
            pages: path.resolve(__dirname, 'client/src/pages'),
            services: path.resolve(__dirname, 'client/src/services'),
            styles: path.resolve(__dirname, 'client/src/styles')
        },
        extensions: ["*", ".js", ".jsx"]
    },
    devServer: {
        host: HOST,
        port: PORT,
        static: {
            directory: path.join(__dirname, './client/dist'),
            watch: true
        },
        hot: true,
        historyApiFallback: true
    },
    stats: 'minimal'
}

