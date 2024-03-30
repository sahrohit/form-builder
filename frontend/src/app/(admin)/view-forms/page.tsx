import { getUserForms } from "@/actions/getUserForms";
import FormsList from "@/app/forms/FormsList";

const ViewFormPage = async () => {
  const forms = await getUserForms();

  return (
    <>
      <FormsList forms={forms} />
    </>
  );
};

export default ViewFormPage;
