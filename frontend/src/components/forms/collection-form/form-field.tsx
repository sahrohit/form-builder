import {
	AwaitedReactNode,
	ChangeEvent,
	JSXElementConstructor,
	ReactElement,
	ReactNode,
	ReactPortal,
} from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { QuestionSelectModel } from "@/types/form-types";
import { FieldOptionSelectModel } from "@/types/form-types";
import { Label } from "@/components/ui/label";

type Props = {
	element: QuestionSelectModel & {
		fieldOptions: Array<FieldOptionSelectModel>;
	};
	value: string;
	onChange: (value?: string | ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({ element, value, onChange }: Props) => {
	if (!element) return null;

	const components = {
		Input: () => <Input type="text" onChange={onChange} />,
		Switch: () => (
			<Switch
				checked={
					!!(element.fieldOptions.find((o: { id: string }) => o.id == value)?.value === "yes")
				}
				onCheckedChange={val =>
					onChange(
						val
							? element.fieldOptions.find((o: { value: string }) => o.value == "yes")?.id
							: element.fieldOptions.find((o: { value: string }) => o.value == "no")?.id
					)
				}
			/>
		),
		// @ts-expect-error Prop Error
		Textarea: () => <Textarea onChange={onChange} />,
		Select: () => (
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue>
						{value
							? element.fieldOptions.find(
									(option: { id: string }) => option.id.replace("answer_", "") == value
								)?.text
							: "Select an option"}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{element.fieldOptions.map(
						(
							option: {
								text:
									| string
									| number
									| boolean
									| ReactElement<any, string | JSXElementConstructor<any>>
									| Iterable<ReactNode>
									| ReactPortal
									| Promise<AwaitedReactNode>
									| null
									| undefined;
								value: any;
								id: any;
							},
							_index: any
						) => (
							<SelectItem key={`${option.text} ${option.value}`} value={`answerId_${option.id}`}>
								{option.text}
							</SelectItem>
						)
					)}
				</SelectContent>
			</Select>
		),
		RadioGroup: () => (
			<RadioGroup onValueChange={onChange}>
				{element.fieldOptions.map(
					(
						option: {
							text:
								| string
								| number
								| boolean
								| ReactElement<any, string | JSXElementConstructor<any>>
								| Iterable<ReactNode>
								| Promise<AwaitedReactNode>
								| null
								| undefined;
							value: { toString: () => any };
							id: any;
						},
						_index: any
					) => (
						<div key={`${option.text} ${option.value}`} className="flex items-center space-x-2">
							<FormControl>
								<RadioGroupItem
									value={`answerId_${option.id}`}
									id={option?.value?.toString() || `answerId_${option.id}`}
								>
									{option.text}
								</RadioGroupItem>
							</FormControl>
							<Label className="text-base">{option.text}</Label>
						</div>
					)
				)}
			</RadioGroup>
		),
	};

	// @ts-expect-error asdasdasd
	return element.fieldType && components[element.fieldType]
		? // @ts-expect-error asdasdasd
			components[element.fieldType]()
		: null;
};

export default FormField;
