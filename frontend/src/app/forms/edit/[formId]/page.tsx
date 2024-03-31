import { getUser } from "@/actions/getUser";
import CreateForm from "@/components/forms/create-form";

const page = async ({
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
		<CreateForm
			initialValues={{
				name: form.name,
				description: form.name,
				answers: form.questions,
			}}
		/>
	);
};
export default page;
