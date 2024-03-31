"use client";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2Icon } from "@radix-ui/react-icons";

type FormPublishProps = {
	formId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const FormPublish = ({ formId, open, onOpenChange }: FormPublishProps) => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(baseUrl + "/forms/" + formId)
			.then(() => alert("Copied to clipboard"))
			.catch(_error => alert("Failed to copy to clipboard"));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Your Form Has Been Published Successfully!</DialogTitle>
					<DialogDescription>
						Your form is now live and ready to be filled out by your users. You can now share
						using the link below.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col">
					<p>Copy link</p>
					<div className="border-2 border-gray-200 flex justify-between items-center mt-2 pl-2 rounded-md">
						<Link2Icon className="h-4 w-4 mr-2" />
						<input
							className="w-full outline-none bg-transparent"
							type="text"
							placeholder="link"
							disabled
							value={`${baseUrl}/forms/${formId}`}
						/>
						<Button onClick={copyToClipboard}>Copy</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FormPublish;
