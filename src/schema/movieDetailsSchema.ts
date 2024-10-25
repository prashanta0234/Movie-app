import { z } from "zod";

const genreSchema = z.object({
	id: z.number(),
	name: z.string(),
});

const productionCompanySchema = z.object({
	id: z.number(),
	name: z.string().nullable(),
	logo_path: z.string().nullable(),
	origin_country: z.string().nullable(),
});

const productionCountriesSchema = z.object({
	iso_3166_1: z.string(),
	name: z.string(),
});

const spokenLanguageSchema = z.object({
	iso_639_1: z.string(),
	name: z.string(),
});

const belongsToCollectionSchema = z
	.object({
		id: z.number(),
		name: z.string(),
		poster_path: z.string().nullable(),
		backdrop_path: z.string().nullable(),
	})
	.nullable();

export const movieSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	belongs_to_collection: belongsToCollectionSchema,
	budget: z.number(),
	genres: z.array(genreSchema),
	homepage: z.string().nullable(),
	id: z.number(),
	imdb_id: z.string().nullable(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string().nullable(),
	production_companies: z.array(productionCompanySchema).optional(),
	production_countries: z.array(productionCountriesSchema).optional(),
	release_date: z.string(),
	revenue: z.number(),
	runtime: z.number().nullable(),
	spoken_languages: z.array(spokenLanguageSchema).optional(),
	status: z.string(),
	tagline: z.string().nullable(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export type MovieDetailsType = z.infer<typeof movieSchema>;
