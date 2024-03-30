import { cookies } from "next/headers";
import { Table } from "./Table";

type Props = {
  formId: string;
};

const ResultsDisplay = async ({ formId }: Props) => {
  const form = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/submission/list`,
    {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        formId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("session-token")?.value}`,
      },
    }
  ).then((res) => res.json());

  if (!form) return null;
  if (!form.submissions) return <p>No submissions on this form yet!</p>;
  console.log("form", form);
  return (
    <div>
      <Table
        data={form.submissions}
        columns={form.questions}
      />
    </div>
  );
};

export default ResultsDisplay;
