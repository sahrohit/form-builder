"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CreateFormSchema, CreateFormValues, fieldTypeEnum } from "./create-form-schema";
import { createForm } from "@/actions/createForm";
import { toast } from "sonner";
import OptionsSelector from "@/components/forms/create-form/options-selector";
import FormPublish from "@/components/modals/form-publish";
import { useState } from "react";

const CreateForm = ({
	initialValues,
}: {
	initialValues?: CreateFormValues;
}) => {
	const [formId, setFormId] = useState("");
	const [publishOpen, setPublishOpen] = useState(false);

	const form = useForm<CreateFormValues>({
		resolver: zodResolver(CreateFormSchema),
		defaultValues: initialValues ?? {
			name: "",
			description: "",
			answers: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "answers",
	});

	const onSubmit = (values: CreateFormValues) => {
		const updatedValues = values.answers.map(a => {
			if (a.fieldType === "Switch") {
				return {
					...a,
					fieldOptions: [
						{
							text: "Yes",
							value: "yes",
						},
						{
							text: "No",
							value: "no",
						},
					],
				};
			}
			return a;
		});

		toast.promise(
			createForm({
				name: values.name,
				description: values.description,
				answers: updatedValues,
			}),
			{
				loading: "Creating Form...",
				success: res => {
					setFormId(res.formId);
					setPublishOpen(true);
					return "Form created successfully!";
				},
				error: "Failed to create form",
			}
		);
	};

	return (
		<Form {...form}>
			<form className="space-y-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-4 w-full">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Name of the Form" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Description of the Form" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					{fields.map((field, index) => (
						<div key={field.id} className="space-y-4 w-full border-2 border-black p-4">
							<FormField
								control={form.control}
								name={`answers.${index}.text`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Field Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`answers.${index}.fieldType`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Field Type</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a Field Type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{fieldTypeEnum.map(fieldType => (
													<SelectItem key={fieldType} value={fieldType}>
														{fieldType}
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>

							{(form.watch(`answers.${index}.fieldType`) === "Select" ||
								form.watch(`answers.${index}.fieldType`) === "RadioGroup") && (
								<OptionsSelector
									nestIndex={index}
									control={form.control}
									setValue={form.setValue}
									key={`${index + 1}-sub-chapter-selector`}
								/>
							)}

							<Button type="button" onClick={() => remove(index)} variant="destructive">
								Delete
							</Button>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() =>
							append({
								text: "New Form",
								fieldType: "Input",
								fieldOptions: [],
							})
						}
					>
						Add New Field
					</Button>
				</div>

				<FormPublish formId={formId} open={publishOpen} onOpenChange={setPublishOpen} />

				<Button className="w-full" type="submit">
					{initialValues ? "Update Form" : "Create Form"}
				</Button>
			</form>
		</Form>
	);
};

export default CreateForm;
