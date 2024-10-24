import { z } from "zod";

const movieSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	genre_ids: z.array(z.number()),
	id: z.number(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string(),
	release_date: z.string(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export const moviesSchema = z.array(movieSchema);

export type MoviesType = z.infer<typeof moviesSchema>;
export type MovieType = z.infer<typeof movieSchema>;
