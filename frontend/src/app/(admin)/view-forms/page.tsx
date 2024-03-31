import { getUserForms } from "@/actions/getUserForms";
import FormList from "@/components/cards/form-list";

const ViewFormPage = async () => {
	const forms = await getUserForms();

	if (forms.length === 0) {
		return <div className="grid place-items-center h-[10vh]">No forms found</div>;
	}

	return <FormList forms={forms} />;
};

export default ViewFormPage;
