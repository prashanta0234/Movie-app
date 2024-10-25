// utils/indexedDB.js
import { MovieDetailsType } from "@/schema/movieDetailsSchema";
import { openDB } from "idb";

const DATABASE_NAME = "movieDb";
const STORE_NAME = "watchlist";

export async function initDB() {
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
}

export async function addWatchList(movie: MovieDetailsType) {
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
}

export const checkWatchlist = async (movieId: number) => {
	const db = await initDB();
	const store = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME);
	return (await store.get(movieId)) !== undefined;
};
