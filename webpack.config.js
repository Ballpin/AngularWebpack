const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./libs/parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {

    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        app: PATHS.app,
        vendor: ['angular']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',

        // Modify the name of the generated sourcemap file
        // You can use [file], [id], and [hash] replacements here.
        // The default option is enough for most use cases.
        sourceMapFilename: '[file].map', // Default

        // This is the sourcemap filename template. It's default format
        // depends on the devtool option used. You don't need to modify this
        // often.
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        })
    ]
};

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            parts.setupClean(['build']),
            parts.setupJS(),
            parts.setupSASS()
        );
        break;
    default:
        config = merge(
            common,
            parts.setupClean(['build']),
            parts.setupJS(),
            parts.setupSASS(),
            parts.browserSync(PATHS.build)
        );
}

module.exports = config;