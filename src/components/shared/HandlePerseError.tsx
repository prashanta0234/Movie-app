"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useErrorStore } from "@/zutand/zutand.store";
import { Button } from "../ui/button";
import revalidateHomePath from "@/server-actions/revalidateHomePath";

const HandlePerseError = ({ message }: { message?: string }) => {
	const router = useRouter();
	const pathname = usePathname();

	const { setIsError } = useErrorStore();
	const onRelaod = () => {
		router.push(pathname);
		revalidateHomePath();
		setIsError(false);
	};

	return (
		<div className="flex w-full h-[90vh] items-center justify-center flex-col gap-4">
			<p>{message}</p>
			<Link href={"/"}>
				<Button>Contact</Button>
			</Link>{" "}
			OR <Button onClick={onRelaod}>Reload</Button>
		</div>
	);
};

export default HandlePerseError;
