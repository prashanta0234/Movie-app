"use server";

import { reqHelper } from "@/helper/reqHelper";
import { movieSchema } from "@/schema/movieDetailsSchema";

export const getMovieAction = async ({ id }: { id: number }) => {
	try {
		const response = await reqHelper({
			method: "GET",
			endpoint: `/movie/${id}`,
		});

		const result = movieSchema.safeParse(response.results);

		if (!result.success) {
			console.error(
				`Response value has changed. Error: ${
					result.error
				}. At: ${new Date().toISOString()}`
			);
			throw new Error(
				"Sorry, there seems to be an issue with our server. Please contact us."
			);
		}
		return result.data;
	} catch (error) {
		console.error(`Error fetching popular movies: ${error}`);
		throw error;
	}
};
