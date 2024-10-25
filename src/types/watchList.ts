export type watchlist = {
	id: number;
	title: string;
	poster_path: string | null | undefined;
	vote_average: number | null | undefined;
	release_date: string | null | undefined;
	isWatchList?: boolean;
	onRemove?: () => void;
};
