/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "production",
    watch: true,

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    entry: {
        "server-app": "./src/frontend/index.tsx"
    },

    output:{
        path: __dirname + '/dist',
        filename: '[name].js',
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx",".js", ".jsx", ".less"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            allowTsInNodeModules: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/frontend/index.html", to: __dirname + '/dist' },
                { from: "./src/frontend/icon.png", to: __dirname + '/dist' }
            ]
        })
    ],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin()
        ]
    },
    externals:{
        "react": "React",
        "react-dom/client": "ReactDOM"
    }
}