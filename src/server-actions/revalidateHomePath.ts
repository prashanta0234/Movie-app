"use server";

import { revalidatePath } from "next/cache";

const revalidateHomePath = () => {
	revalidatePath("/", "page");
};
export default revalidateHomePath;
