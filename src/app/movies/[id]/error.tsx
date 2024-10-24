"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className="w-full h-[90vh]">
			<div className="w-full flex flex-col items-center justify-center h-full">
				<h1>{error.message}</h1>
				<Button onClick={() => reset()}>Try again</Button>
				<p>OR</p>
				<Link href={"/"}>
					<Button>Go to home</Button>
				</Link>
			</div>
		</div>
	);
};

export default Error;
