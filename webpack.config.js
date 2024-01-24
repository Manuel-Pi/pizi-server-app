/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "production",

    // Enable sourcemaps for debugging webpack's output.
    //devtool: "source-map",

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
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.less$/,
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
                { from: "./src/frontend/index.html", to: __dirname + '/dist' }
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
        "react-dom": "ReactDOM"
    }
}