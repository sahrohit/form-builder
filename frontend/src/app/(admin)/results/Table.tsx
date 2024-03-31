"use client";

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export function Table(props: any) {
	const { data } = props;
	const columns = [
		columnHelper.accessor("id", {
			cell: info => info.getValue(),
		}),
		...props.columns.map((question: any, _index: number) => {
			return columnHelper.accessor(
				row => {
					let answer = row.answers.find((answer: any) => {
						return answer.questionId === question.id;
					});

					return answer.fieldOption ? answer.fieldOption.text : answer.value;
				},
				{
					header: () => question.text,
					id: question.id.toString(),
					cell: info => info.renderValue(),
				}
			);
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="p-2 mt-4">
			<div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
				<table>
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id} className="border-b">
								{headerGroup.headers.map(header => (
									<th key={header.id} className="text-left p-3">
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200">
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} className="py-2">
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className="p-3">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
