export const emptyValidate = function <T>(val: { title: string; content: string }) {
	let hasError = false;
	const errors: { title: string[], content: string[] } = {title: [], content: []};
	if (val.title.trim() === "") {
		hasError = true;
		errors.title.push("请输入标题");
	}
	if (val.content.trim() === "") {
		hasError = true;
		errors.content.push("请输入内容");
	}
	return [hasError, errors];
};
