import React from "react";
import { Button } from "../ui/button";

const ErrorMessage = ({ message }: { message: string }) => {
	return (
		<div className="flex w-full h-[90vh] items-center justify-center flex-col gap-4">
			<p>{message}</p>
			<Button>Contact</Button>
		</div>
	);
};

export default ErrorMessage;
