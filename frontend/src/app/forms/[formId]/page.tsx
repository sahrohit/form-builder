import Form from "../Form";

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

  const form = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/form/${formId}`
  ).then((res) => res.json());

  if (!form) {
    return <div>Form not found</div>;
  }

  return <Form form={form} />;
};
export default page;
