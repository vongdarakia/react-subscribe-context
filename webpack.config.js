const path = require("path");

module.exports = {
    target: "web",
    entry: "./src/react-subscribe-context/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
            components: path.resolve(__dirname, "src/components"),
            constants: path.resolve(__dirname, "src/constants"),
            definitions: path.resolve(__dirname, "src/types"),
            examples: path.resolve(__dirname, "src/examples"),
            "react-subscribe-context": path.resolve(__dirname, "src/react-subscribe-context"),
            utils: path.resolve(__dirname, "src/utils"),
        },
    },
    externals: {
        react: "react",
    },
    mode: "production",
};
