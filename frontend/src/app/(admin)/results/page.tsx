import FormsPicker from "./FormsPicker";
import ResultsDisplay from "./ResultsDisplay";
import { getUserForms } from "@/actions/getUserForms";

const page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const userForms = await getUserForms();

  if (!userForms?.length || userForms.length === 0) {
    return <div>No forms found</div>;
  }

  const selectOptions = userForms.map((form: { name: string; id: string }) => {
    return {
      label: form.name,
      value: form.id,
    };
  });

  return (
    <div>
      <FormsPicker options={selectOptions} />
      <ResultsDisplay
        formId={
          searchParams?.formId
            ? (searchParams.formId as string)
            : userForms[0].id
        }
      />
    </div>
  );
};

export default page;
