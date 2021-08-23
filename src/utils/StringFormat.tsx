export const NameFormat = (message: string) => {
	return message.charAt(0).toUpperCase() + message.slice(1);
};

export const IndexFormat = (index: string | number) => {
	if (typeof index == "number") index = index.toString();

	return ("000" + index).substr(-3);
};
