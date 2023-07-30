module.exports = api => {
	return {
		// 你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions
		plugins: [
			// postcss-preset-env 包含 autoprefixer，因此如果你已经使用了 preset 就无需单独添加它了
			"postcss-preset-env",
		],
	};
};
