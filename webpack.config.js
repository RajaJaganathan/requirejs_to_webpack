const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'js/main'),
    output: {
        filename: 'dist/bundle.js'
    },
    resolve: {
        modules: ['js', 'node_modules'],
        alias: {
            jquery: path.join(__dirname, 'node_modules/jquery/dist/jquery'),
            underscore: path.join(__dirname, 'node_modules/underscore/underscore'),
            backbone: path.join(__dirname, 'node_modules/backbone/backbone'),
            backboneLocalstorage: path.join(__dirname, 'node_modules/backbone.localstorage/backbone.localStorage'),
            text: path.join(__dirname, 'node_modules/requirejs-text/text')
        }
    },
    module: {
        rules: [
            { test: /underscore/, loader: 'expose-loader?_' },
            { test: /backbone/, loader: 'expose-loader?Backbone!imports-loader?underscore,jquery' },
            { test: /backboneLocalstorage/, loader: 'expose-loader?Store!imports-loader?backbone' },
            { test: /.html/, loader: 'raw-loader' }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin('dist', {
        //     verbose: true,
        //     dry: false
        // }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            compress: false
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
}
