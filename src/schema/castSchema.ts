import { z } from "zod";

const CastMemberSchema = z.object({
	adult: z.boolean(),
	gender: z.number().int(),
	id: z.number().int(),
	known_for_department: z.string(),
	name: z.string(),
	original_name: z.string(),
	popularity: z.number(),
	profile_path: z.string().nullable(),
	cast_id: z.number().int(),
	character: z.string(),
	credit_id: z.string(),
	order: z.number().int(),
});

export const CastsSchema = z.array(CastMemberSchema);
export type CastsType = z.infer<typeof CastsSchema>;
export type CastType = z.infer<typeof CastMemberSchema>;
