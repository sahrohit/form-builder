import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const page = () => {
	return (
		<div className="grid place-items-center h-screen max-w-2xl mx-auto">
			<div className="flex flex-col gap-2">
				<Alert variant="default">
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>
						Your answers were recorded successfully. Thank you for submitting the form!{" "}
					</AlertDescription>
				</Alert>
				<Link href="/" className={buttonVariants({ variant: "default" })}>
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default page;
