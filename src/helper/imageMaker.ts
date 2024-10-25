const IMAGE_URL = process.env.IMAGE_URL ?? "https://image.tmdb.org/t/p/w500";
export const imageMaker = (path: string) => {
	return `${IMAGE_URL}${path}`;
};
