import { z } from "zod";

export const movieSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	genre_ids: z.array(z.any()).optional(),
	id: z.number(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number().optional(),
	poster_path: z.string().nullable(),
	release_date: z.string().optional(),
	title: z.string(),
	video: z.boolean().optional(),
	vote_average: z.number().optional(),
	vote_count: z.number().optional(),
});

export const moviesSchema = z.array(movieSchema);

export type MoviesType = z.infer<typeof moviesSchema>;
export type MovieType = z.infer<typeof movieSchema>;
