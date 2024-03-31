import { getUser } from "@/actions/getUser";
import CreateForm from "@/components/forms/create-form";
import Header from "@/components/ui/header";
import { redirect } from "next/navigation";

const EditFormPage = async ({
	params,
}: {
	params: {
		formId: string;
	};
}) => {
	const formId = params.formId;

	if (!formId) {
		return <div>Form not found</div>;
	}

	const userId = (await getUser()).user.id;

	if (!userId) {
		redirect("/");
	}

	const form = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/form/${formId}`).then(
		res => res.json()
	);

	if (userId !== form?.userId) {
		return <div>You are not authorized to view this page</div>;
	}

	if (!form) {
		return <div>Form not found</div>;
	}

	return (
		<div className="w-full">
			<Header />
			<div className="max-w-5xl mx-auto my-16">
				<div className="my-4">
					<h1 className="text-3xl text-center">Editing Form</h1>
					<p className="text-center">Design the form based on your needs</p>
				</div>
				<CreateForm
					initialValues={{
						name: form.name,
						description: form.name,
						answers: form.questions,
					}}
				/>
			</div>
		</div>
	);
};
export default EditFormPage;
