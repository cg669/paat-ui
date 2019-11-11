const path = require("path");
const include = path.resolve(__dirname, '../');
const autoprefixer = require('autoprefixer')
const marked = require("marked");
const renderer = new marked.Renderer();
module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                include: /src/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', "@babel/preset-react"],
                            plugins: ['@babel/transform-runtime']
                        },
                    }
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                include,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', "@babel/preset-react"],
                            plugins: [
                                ['import', { libraryName: "antd", style: true }]
                            ]
                        },
                    },
                    { loader: 'ts-loader' },
                ],
            },
            {
                test: /\.scss|.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [autoprefixer()],
                        },
                    },
                    { loader: 'resolve-url-loader', options: { sourceMap: true, keepQuery: true } },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            data: `@import './src/styles/theme.scss';`,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                loaders: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: { "@primary-color": "#d8df19" },
                            javascriptEnabled: true
                        }
                    }
                ],
                include
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: '../',
                            hash: 'sha512',
                            digest: 'hex',
                            name: 'res/[hash].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        },
                    },
                ],
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                    },
                    {
                        loader: 'svgo-loader',
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            pedantic: true,
                            renderer
                        }
                    },
                ],
            },
        ]
    }
};