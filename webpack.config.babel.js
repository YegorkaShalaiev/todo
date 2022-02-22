import path from 'path';
import config from 'config';

const { HOST, PORT } = config.get('server');

export default {
    entry: './frontend/src/index.js',
    mode: config.get('env'),
    output: {
        path: path.resolve(__dirname, 'frontend/dist'),
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
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    devServer: {
        host: HOST,
        port: PORT,
        static: {
            directory: path.join(__dirname, './frontend/dist'),
            watch: true
        },
        hot: true
    }
}

