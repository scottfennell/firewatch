var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist',
        // publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },{
            test: /\.(png|jpg|gif)$/,
            use: [
            {
                loader: 'file-loader',
                options: {}  
            }
            ]
        }]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
};
