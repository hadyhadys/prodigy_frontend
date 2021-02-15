const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname,'static/src','index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'static/build'),
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
          {
            test: /\.(css|scss)$/,
            use: ["style-loader", "css-loader", "sass-loader"]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          },
          {
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            use: ['file-loader']
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [ 'file-loader']
          },
        ]
    },
    plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname,'static/build/index.html')
    })
    ]
}