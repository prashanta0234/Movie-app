import { watchlist } from "@/types/watchList";
import { openDB } from "idb";

const DATABASE_NAME = "movieDb";
const STORE_NAME = "watchlist";

export const initDB = () => {
	return openDB(DATABASE_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {
					keyPath: "id",
					autoIncrement: false,
				});
			}
		},
	});
};

export const addWatchList = async (movie: watchlist) => {
	const db = await initDB();
	const tx = db.transaction(STORE_NAME, "readwrite");
	const store = tx.objectStore(STORE_NAME);

	const existingMovie = await store.get(movie.id);

	if (existingMovie) {
		await store.delete(movie.id);
		return { added: false };
	} else {
		await store.put(movie);
		return { added: true };
	}
};

export const checkWatchlist = async (movieId: number) => {
	const db = await initDB();
	const store = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME);
	return (await store.get(movieId)) !== undefined;
};

export const getWatchlist = async () => {
	const db = await initDB();
	const tx = db.transaction(STORE_NAME, "readonly");
	const store = tx.objectStore(STORE_NAME);
	return await store.getAll();
};

export async function removeFromWatchlist(movieId: number) {
	const db = await initDB();
	await db.delete("watchlist", movieId);
	return movieId;
}
