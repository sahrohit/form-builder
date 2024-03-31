import { type Control, useFieldArray, type UseFormSetValue } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { CreateFormSchema } from "./create-form-schema";
import { Input } from "@/components/ui/input";

export type CreateFormValues = z.infer<typeof CreateFormSchema>;

const OptionsSelector = ({
	nestIndex,
	control,
}: {
	nestIndex: number;
	control: Control<CreateFormValues>;
	setValue: UseFormSetValue<CreateFormValues>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `answers.${nestIndex}.fieldOptions`,
	});

	return (
		<div className="flex flex-col flex-wrap gap-2 border-2 border-black p-4">
			{fields.map((field, index) => (
				<div
					className="flex flex-row gap-2 "
					key={`question-${nestIndex}-subChapter-${index + 1}-${field.id}`}
				>
					<FormField
						control={control}
						name={`answers.${nestIndex}.fieldOptions.${index}.text`}
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Text</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Label" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`answers.${nestIndex}.fieldOptions.${index}.value`}
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Value</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Value" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="button"
						variant="destructive"
						onClick={() => {
							remove(index);
						}}
					>
						Delete
					</Button>
				</div>
			))}

			<Button
				type="button"
				variant="outline"
				onClick={() => {
					append({ text: "", value: "" });
				}}
			>
				Add New Option
			</Button>
		</div>
	);
};

export default OptionsSelector;
