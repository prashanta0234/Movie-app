"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		} else {
			setIsDarkMode(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);
	const toggleTheme = () => {
		setIsDarkMode((prev) => {
			const newTheme = !prev;
			localStorage.setItem("theme", newTheme ? "dark" : "light");

			if (newTheme) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			return newTheme;
		});
	};

	return (
		<div className="flex items-center">
			<span className="mr-2">
				{isDarkMode ? (
					<Moon className="text-[#FFCC33] drop-shadow-lg" />
				) : (
					<Sun className="text-[#FFCC33] drop-shadow-lg" />
				)}
			</span>
			<Switch
				checked={isDarkMode}
				onCheckedChange={toggleTheme}
				className="bg-gray-200 dark:bg-gray-600"
			/>
		</div>
	);
};

export default ThemeToggle;
