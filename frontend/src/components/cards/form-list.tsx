"use client";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { deleteForm } from "@/actions/deleteForm";

type Props = {
	forms: {
		id: string;
		name: string;
		description: string;
	}[];
};

const FormList = ({ forms }: Props) => {
	return (
		<div className="grid grid-cols1 md:grid-cols-3 m-5 p-4 gap-4">
			{forms.map(form => (
				<Card key={form.id} className="max-w-[350px] flex flex-col">
					<CardHeader className="flex-1">
						<CardTitle>{form.name}</CardTitle>
						<CardDescription>{form.description}</CardDescription>
					</CardHeader>
					<CardFooter className="flex flex-row gap-3">
						<Link className="w-full" href={`/forms/edit/${form.id}`}>
							<Button className="w-full">View</Button>
						</Link>
						<Button
							className="w-full"
							variant="destructive"
							onClick={() =>
								toast.promise(deleteForm({ id: form.id }), {
									loading: "Deleting form...",
									success: "Form deleted",
									error: "Failed to delete form",
								})
							}
						>
							Delete
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default FormList;
