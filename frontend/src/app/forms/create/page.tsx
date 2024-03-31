import { getUser } from "@/actions/getUser";
import CreateForm from "@/components/forms/create-form";
import Header from "@/components/ui/header";
import { redirect } from "next/navigation";

const CreateFormPage = async () => {
	const session = await getUser();

	if (!session?.user?.id) {
		redirect("/");
	}

	return (
		<div className="w-full">
			<Header />
			<div className="max-w-5xl mx-auto my-16">
				<div className="my-4">
					<h1 className="text-3xl text-center">Create New Form</h1>
					<p className="text-center">Design the form based on your needs</p>
				</div>
				<CreateForm />
			</div>
		</div>
	);
};
export default CreateFormPage;
