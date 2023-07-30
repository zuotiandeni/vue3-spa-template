module.exports = {
	// presets: [
	// 	// 仅配置了预设（智能预设，可以编译 ES6 的语法）
	// 	"@babel/preset-env",
	// ],
	presets: [["@babel/preset-env", { targets: "ie 11" }]],
	plugins: ["@babel/plugin-transform-runtime"],
};
