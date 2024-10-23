"use client";
import React, { useState, ChangeEvent, useCallback } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "@/helper/debounce";

const SearchInput: React.FC = () => {
	const [searchText, setSearchText] = useState<string>("");

	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value.toLowerCase());
			return params.toString();
		},
		[searchParams]
	);

	const debouncedHandleInputChange = useCallback(
		debounce((val: string) => {
			router.push(pathname + "?" + createQueryString("title", val));
		}, 250),
		[createQueryString, pathname, router]
	);

	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setSearchText(value);
			debouncedHandleInputChange(value);
		},
		[debouncedHandleInputChange]
	);

	const clearInput = useCallback(() => {
		setSearchText("");
		router.push(pathname);
	}, [pathname, router]);

	return (
		<div className="relative flex items-center">
			<Input
				type="text"
				value={searchText}
				onChange={handleInputChange}
				placeholder="Search by title..."
				className="dark:border-0 dark:bg-white text-black"
			/>
			{searchText && (
				<button
					onClick={clearInput}
					className="absolute right-2 text-gray-500 hover:text-gray-700"
				>
					✕
				</button>
			)}
		</div>
	);
};

export default SearchInput;
