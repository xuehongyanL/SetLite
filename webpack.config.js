var webpack = require('webpack');
module.exports = {
    target: 'electron-renderer',
    entry:__dirname+'/app/renderer.js',
    output: {
        path: __dirname,
        filename: './app/bundle.js'
    },
    module: {
        rules:  [
            {
                test:/\.js$/,
                exclude:'/node_modules/',
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-react', '@babel/preset-env'],
                    plugins:['@babel/plugin-proposal-class-properties'],
                    compact: false
                }
            }
        ]
    }
};
