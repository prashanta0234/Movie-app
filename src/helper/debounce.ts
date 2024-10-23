const debounce = (func: (...args: string[]) => unknown, timeout = 300) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: string[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

export default debounce;
