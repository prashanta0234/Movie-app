import { z } from "zod";

const genreSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export const movieSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	belongs_to_collection: z.string().nullable(),
	budget: z.number(),
	genres: z.array(genreSchema),
	homepage: z.string().url(),
	id: z.number(),
	imdb_id: z.string(),
	origin_country: z.array(z.string()),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string(),
	production_companies: z
		.array(
			z.object({
				id: z.number(),
				name: z.string(),
				logo_path: z.string().nullable(),
				origin_country: z.string(),
			})
		)
		.optional(),
	production_countries: z
		.array(
			z.object({
				iso_3166_1: z.string(),
				name: z.string(),
			})
		)
		.optional(),
	release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	revenue: z.number(),
	runtime: z.number().nullable(),
	spoken_languages: z
		.array(
			z.object({
				iso_639_1: z.string(),
				name: z.string(),
			})
		)
		.optional(),
	status: z.string(),
	tagline: z.string().optional().nullable(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export type MovieDetailsType = z.infer<typeof movieSchema>;
