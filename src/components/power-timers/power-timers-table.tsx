import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useFieldArray } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";

interface PowerTimersTableProps {
	form: UseFormReturn<SavePowerTimersInput>;
}

export default function PowerTimersTable({
	form,
}: PowerTimersTableProps) {
	const { fields } = useFieldArray({
		control: form.control,
		name: "powerTimers",
	});

	return (
		<Table>
			<TableBody>
				{fields.map((field, index) => {
					const timer = form.watch(`powerTimers.${index}`);
					return (
						<TableRow key={field.id}>
							<TableCell>{timer.timerNumber}</TableCell>
							<TableCell>{timer.powerOffTime}</TableCell>
							<TableCell>{timer.powerOnTime}</TableCell>
							<TableCell>{timer.daysOfWeek.join(", ")}</TableCell>
							<TableCell>{timer.enabled ? "Yes" : "No"}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
