
export const NameFormat = (message: string) => {
	return message.charAt(0).toUpperCase() + message.slice(1);
}

export const IndexFormat = (index: string) => {
	const formatted = ('000' + index).substr(-3);

	console.log(formatted)

	return formatted;
}
