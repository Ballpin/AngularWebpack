// Require Plugins
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Export BrowserSync
exports.browserSync = function (paths) {
    return {
        plugins: [
            new BrowserSyncPlugin({
                // browse to http://localhost:3000/ during development,
                // ./public directory is being served
                host: 'localhost',
                port: 3000,
                server: {baseDir: [paths]},
                open:false
            })
        ]
    }
};

// Export SASS & CSS & Style Settings
exports.setupSASS = function () {
    var extractCSS = new ExtractTextPlugin('assets/css/[name].css');
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/i,
                    loader: extractCSS.extract(['css','sass'])
                }
            ]
        },
        plugins: [
            extractCSS
        ]
    }
};

// Clean Build Directory
exports.setupClean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin(path, {
                root: __dirname,
                verbose: true,
                dry: false
            })
        ]
    }
};

// Export Babel JS
exports.setupJS = function () {
    return {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel', // 'babel-loader' is also a legal name to reference
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    }
};