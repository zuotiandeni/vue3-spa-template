const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const appHtml = path.resolve(__dirname, "../public/index.html");
// 本插件会提取css到单独的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 此插件用于优化和压缩CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const isProd = process.env.NODE_ENV === "production";

console.log(isProd);
module.exports = {
	mode: isProd ? "production" : "development",
	devtool: isProd ? "source-map" : "inline-source-map", // 可用选项参考：https://webpack.docschina.org/configuration/devtool
	entry: {
		index: "./src/index.js",
	},
	output: {
		filename: "[name].[contenthash:8].js",
		path: path.resolve(__dirname, "../dist"),
		// publicPath: "/", // 发送到 output.path 目录的每个文件，都将从 output.publicPath 位置引用
		clean: true, // 每次构建前清理 /dist 文件夹
	},
	// 如果想要在一个 HTML 页面上使用多个入口，还需设置 optimization.runtimeChunk: 'single'
	// // 将包含chunks映射关系的list单独从入口文件里提取出来，方便浏览器缓存，否则会在入口文件js中每次都会发生变化，所有的入口文件一起共同生成一个runtimeChunk。
	optimization: {
		runtimeChunk: "single",
		// chunk分离
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					// 告诉 webpack 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项，并始终为此缓存组创建 chunk。
					enforce: false,
				},
			},
		},
		// 压缩CSS
		// 这将仅在生产环境开启 CSS 优化。如果还想在开发环境下启用 CSS 优化，请将 optimization.minimize 设置为 true
		minimizer: [
			// js的压缩全靠这三个...，webpack认为，如果配置了minimizer，就表示开发者在自定义压缩插件，无论配置minimizer是true还是false，内部的JS压缩器都会被覆盖掉。所以我们这里要手动把它加回来，webpack内部使用的JS压缩器是terser-webpack-plugin.
			`...`,
			new CssMinimizerPlugin(),
		],
		minimize: isProd, // 如果是ture会进行js、css压缩，会产生LICENSE.txt文件，把注释提取到单独的txt文件中
	},
	// 更多配置文档：https://webpack.docschina.org/configuration/dev-server
	devServer: {
		static: {
			directory: path.join(__dirname, "../dist"),
		},
		client: {
			progress: true, // 显示当前编译进度
		},
		compress: true, // 启用 gzip 压缩
		historyApiFallback: true,
		hot: true, // 模块热更新
		open: true, // 自动打开浏览器
		port: "auto", // 自动使用一个可用端口
		proxy: {
			"/api": {
				target: "http://cf-pc-dev.wti-xa.com:7777",
				changeOrigin: true, // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求,主要解决跨域问题
				pathRewrite: {
					// '^/api': ''
				},
			},
		},
		// 默认情况下，开发服务器将通过 HTTP 提供服务。可以选择使用 HTTPS 提供服务:
		// https: true,
	},
	resolve: {
		// import引入文件的时候不用加后缀,webpack会自动按顺序尝试解析
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		// 路径别名
		alias: { "@": path.resolve(__dirname, "../src") },
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					// 不要同时使用* `style-loader` *与* `mini-css-extract-plugin`*。*
					isProd ? MiniCssExtractPlugin.loader : "style-loader",
					"css-loader",
					"postcss-loader",
				],
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					isProd ? MiniCssExtractPlugin.loader : "style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				type: "asset",
				// 不配置的情况下，webpack会把8k以下的文件转换成base64的URL
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 4kb
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				exclude: /(node_modules)/,
				// include: path.resolve(__dirname, '../src'),
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: !isProd, // 使用 cacheDirectory 选项，将 babel-loader 提速至少两倍。这会将转译的结果缓存到文件系统中。
						// presets: [["@babel/preset-env", { targets: "ie 11" }]],
						// plugins: ["@babel/plugin-transform-runtime"],
						// 上边两项配置移动到babel.config.js
					},
				},
			},
			{
				test: /\.vue$/,
				use: "vue-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Vue3+webpack5系统框架",
			template: appHtml,
			favicon: path.resolve(__dirname, "../public/favicon.ico"),
			// 附加一个唯一的webpack编译散列到所有包含的脚本和CSS文件。这对缓存破坏很有用
			// 这里所有的引用都用一个hash值每次都会所有的都发生改变，所以用output的[contenthash]hash来替换这里。
			// hash: true,
			xhtml: true, // 如果为true，则将链接标记呈现为自关闭(符合XHTML)
		}),
		// 打包分析工具
		isProd &&
			new BundleAnalyzerPlugin({
				analyzerMode: "static", // 生成一个分析报告的html文件（默认生成一个 report.html）
				openAnalyzer: false, // 默认值为true，是否在浏览器中自动打开报表
			}),
		// 提取CSS文件
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css",
		}),
		new VueLoaderPlugin(),
	].filter(Boolean), // 去掉假值
};
