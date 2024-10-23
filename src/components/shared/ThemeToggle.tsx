"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "../ui/switch"; // Make sure this switch component is imported correctly
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	// Effect to check for saved theme preference when the component mounts
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		} else {
			setIsDarkMode(false);
			document.documentElement.classList.remove("dark");
		}
	}, []); // Run only once when the component mounts

	// Function to toggle theme
	const toggleTheme = () => {
		setIsDarkMode((prev) => {
			const newTheme = !prev;
			localStorage.setItem("theme", newTheme ? "dark" : "light");

			// Apply or remove the dark class on the document
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
