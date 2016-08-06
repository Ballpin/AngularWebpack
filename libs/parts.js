// Require Plugins
const webpack = require('webpack');
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

                // Use this server if you want to go without webpack-dev-server
                // server: {baseDir: [paths]},
                host: 'localhost',
                port: 3000,

                open: false,

                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                proxy: 'http://localhost:8080/'
            }, {
                reload: false
            })
        ]
    }
};

// Export SASS & CSS & Style Settings
exports.setupSASS = function () {
    var extractCSS = new ExtractTextPlugin('assets/css/[name].css');
    return {
        devtool: "source-map", // or "inline-source-map"
        module: {
            loaders: [
                {
                    test: /\.scss$/i,
                    loader: extractCSS.extract(['css?sourceMap', 'sass?sourceMap'])
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
                root: process.cwd(),
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


// Minify the build
exports.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
};


// Set Node variables
exports.setFreeVariable = function (key, value) {
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

exports.devServer = function (options) {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API b
            // routing works. This is a good default that will co
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};