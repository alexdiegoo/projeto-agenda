const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'frontend', 'main.js'),
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                    
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'source-map'
}