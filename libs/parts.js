// Require Plugins
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');




// Export BrowserSync
exports.browserSync = function (paths) {
    return {
        plugins: [
            new BrowserSyncPlugin({
                // browse to http://localhost:3000/ during development,
                // ./public directory is being served
                host: 'localhost',
                port: 3000,
                server: {baseDir: [paths]}
            })
        ]
    }
};

exports.setupSASS = function () {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                }
            ]
        }
    }
};