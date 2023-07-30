import _ from "lodash";

import "./style.less";

import backgroundImg from "./backgroundImg.jpeg";
import gongshang from "./ht_zyxh.png";
function component() {
	const element = document.createElement("div");
	element.innerHTML = _.join(["Hello", "webpack5", "Vue3"], "   ");
	element.className = "hello-world";

	// 添加图片
	const myImg = new Image();
	myImg.src = backgroundImg;

	// PNG
	const pngImg = new Image();
	pngImg.src = gongshang;

	element.appendChild(myImg);
	element.appendChild(pngImg);
	return element;
}

const func = () => {
	[1, 2, 3].map(item => {
		console.log(item);
	});
};
func();

document.body.appendChild(component());
