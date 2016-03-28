module.exports = {
    entry: "./index.js",
    output: {
        path: "./dist/",
        filename: "SuperSelect.js",
        library: "SuperSelect",
        libraryTarget: "umd",
        publicPath: "/dist/"
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ["react", "es2015"]
            }
        }]
    }
};
